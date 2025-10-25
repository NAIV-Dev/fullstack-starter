import moment from "moment";
import { getAdminFromAuthHeader } from "../jwt";
import { T_adminCreateTransaksi } from "../types/api/adminCreateTransaksi";
import { Transaksi } from "../types/model/table/Transaksi";
import { MetodePembayaran } from "../types/model/enum/MetodePembayaran";
import { TransaksiDetail } from "../types/model/table/TransaksiDetail";
import { Layanan } from "../types/model/table/Layanan";
import { In } from "typeorm";
import { Pelanggan } from "../types/model/table/Pelanggan";

export const adminCreateTransaksi: T_adminCreateTransaksi = async req => {
  const admin = await getAdminFromAuthHeader(req.headers.authorization);
  const trx = new Transaksi();

  if (req.body.pelanggan_baru) {
    let pelanggan = await Pelanggan.findOneBy({
      nama: req.body.pelanggan_baru.nama ?? '',
      nomor_hp: req.body.pelanggan_baru.nomor_hp ?? '',
      alamat: req.body.pelanggan_baru.alamat ?? '',
    });
    if (!pelanggan) {
      pelanggan = new Pelanggan();
      pelanggan.nama = req.body.pelanggan_baru.nama ?? '';
      pelanggan.nomor_hp = req.body.pelanggan_baru.nomor_hp ?? '';
      pelanggan.alamat = req.body.pelanggan_baru.alamat ?? '';
      await pelanggan.save();
    }
    trx.pelanggan_id = pelanggan.id;
  } else {
    if (req.body.pelanggan_id) {
      trx.pelanggan_id = req.body.pelanggan_id;
    } else {
      throw new Error(`data pelanggan tidak boleh kosong`);
    }
  }
  trx.pengguna_id = req.body.pengguna_id ?? admin.id;
  trx.nomor_transaksi = '';
  trx.tanggal_transaksi = moment(req.body.tanggal_transaksi).toDate();
  trx.sudah_diambil = req.body.sudah_diambil || false;
  trx.sudah_lunas = req.body.sudah_lunas || false;
  trx.total_harga = req.body.total_harga;
  trx.catatan = req.body.catatan || '';
  trx.metode_pembayaran = req.body.metode_pembayaran as MetodePembayaran;
  await trx.save();

  trx.nomor_transaksi = `TRX/${moment(trx.tanggal_transaksi).format('YYMMDD')}/${trx.id}`;
  await trx.save();

  const list_layanan = await Layanan.findBy({ id: In(req.body.items.map(x => x.layanan_id)) });
  await TransaksiDetail.save(req.body.items.map(item => {
    const layanan = list_layanan.find(l => l.id == item.layanan_id);
    if (!layanan) {
      throw new Error(`Layanan id = ${item.layanan_id} not found`);
    }
    const td = new TransaksiDetail();
    td.transaksi_id = trx.id;
    td.layanan_id = layanan.id;
    td.jumlah = item.jumlah;
    td.harga_satuan = layanan.harga_satuan;
    td.subtotal = Math.round(td.jumlah * td.harga_satuan);
    return td;
  }));

  return trx;
}
