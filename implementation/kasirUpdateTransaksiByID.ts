import { In, IsNull } from "typeorm";
import { getKasirFromAuthHeader } from "../jwt";
import { T_kasirUpdateTransaksiByID } from "../types/api/kasirUpdateTransaksiByID";
import { Transaksi } from "../types/model/table/Transaksi";
import moment from "moment";
import { MetodePembayaran } from "../types/model/enum/MetodePembayaran";
import { Layanan } from "../types/model/table/Layanan";
import { TransaksiDetail } from "../types/model/table/TransaksiDetail";
import { Pelanggan } from "../types/model/table/Pelanggan";

export const kasirUpdateTransaksiByID: T_kasirUpdateTransaksiByID = async req => {
  const kasir = await getKasirFromAuthHeader(req.headers.authorization);
  const trx = await Transaksi.findOneBy({
    id: req.path.id,
    pengguna_id: kasir.id,
    deleted_at: IsNull()
  });
  if (!trx) {
    throw new Error(`data not found`);
  }

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
    }
  }
  
  trx.tanggal_transaksi = req.body.tanggal_transaksi ? moment(req.body.tanggal_transaksi).toDate() : trx.tanggal_transaksi;
  trx.sudah_diambil = req.body.sudah_diambil || false;
  trx.sudah_lunas = req.body.sudah_lunas || false;
  trx.total_harga = req.body.total_harga ?? trx.total_harga;
  trx.catatan = req.body.catatan || '';
  trx.metode_pembayaran = req.body.metode_pembayaran as MetodePembayaran ?? trx.metode_pembayaran;
  await trx.save();

  if (req.body.items) {
    const list_layanan = await Layanan.findBy({ id: In((req.body.items ?? []).map(x => x.layanan_id)) });
    await TransaksiDetail.delete({ transaksi_id: trx.id });
    await TransaksiDetail.save((req.body.items ?? []).map(item => {
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
  }

  return trx.save();
}
