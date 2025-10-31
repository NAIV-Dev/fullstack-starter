import { Layanan } from "@/api-client/model/table/Layanan";
import { TransaksiFulldata } from "@/api-client/schema/TransaksiFulldata";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";
import { useState } from "react";

interface PrintTransaksiModalProps {
  data: TransaksiFulldata
  listLayanan: Layanan[]
  open: boolean
  setOpen(open: boolean): void
  onFinish(): void
}

export function PrintTransaksiModal(props: PrintTransaksiModalProps) {
  const [loading, setLoading] = useState<boolean>(false);

  async function printReceipt() {
    if (loading) {
      return;
    }
    try {
      setLoading(true);
      setTimeout(() => {
        new Promise(async (resolve) => {
          const res = globalPrintReceipt(props.data, props.listLayanan);
          resolve(null);
        });
      }, 500);
      await new Promise(resolve => setTimeout(() => {
        props.setOpen(false);
        props.onFinish();
        resolve(null);
      }, 2000));
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal
      isOpen={props.open}
      onOpenChange={props.setOpen}>
      <ModalContent>
        <ModalHeader>
          Cetak data transaksi pelanggan {props.data.pelanggan.nama} ({props.data.transaksi.nomor_transaksi})?
        </ModalHeader>
        <ModalBody className='flex flex-col gap-2'>
         Pastikan bluetooth telah terhubung ke printer thermal
        </ModalBody>
        <ModalFooter>
          <Button
            isLoading={loading}
            color="primary"
            onPress={() => printReceipt()}>
            { loading ? 'Sedang Mencetak' : 'Cetak'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

interface PrintReceiptData {
  nomor_transaksi: string
  item_transaksi: {
    nama_layanan: string
    label_satuan: string
    jumlah: string | number
  }[]
  sudah_lunas: boolean
  total_harga: string | number
  nama_pelanggan: string
  alamat_pelanggan: string
  nomor_hp_pelanggan: string
}
export function globalPrintReceipt(data: TransaksiFulldata, list_layanan: Layanan[]): boolean {
  const output = [
    `[C]<font size='tall'>WENING LAUNDRY</font>\n` +
    "[L]\n" +
    `[C]<u><font size='big'>${data.transaksi.nomor_transaksi}</font></u>\n` +
    "[L]\n" +
    "[C]================================\n" +
    "[L]\n" +
    data.list_item.map(item => {
      const layanan = list_layanan.find(l => l.id == item.layanan_id);
      const max_len = 18;
      const nama_layanan = layanan?.nama ?? '';
      const arr_name = nama_layanan.length > max_len ? nama_layanan.match(/.{1,18}/g) : [nama_layanan];
      return [
        `[L]<b>${arr_name?.[0] ?? ''}</b>[R]${new Intl.NumberFormat('id-ID').format(+(item.jumlah ?? 0))} ${layanan?.label_satuan ?? ''}\n`,
        ...(arr_name ?? []).slice(1).map(l => `[L]  ${l}\n`),
        "[L]\n"
      ].join('');
    }).join(''),
    "[C]--------------------------------\n" +
    `[R]TOTAL HARGA :[R]Rp ${new Intl.NumberFormat('id-ID').format(+(data.transaksi.total_harga ?? 0))}\n` +
    `[R]STATUS :[R]${data.transaksi.sudah_lunas ? 'LUNAS' : 'Belum Bayar'}\n` +
    "[L]\n" +
    "[C]================================\n" +
    "[L]\n" +
    `[L]<b><font size='tall'>${data.pelanggan.nama}</font><b>\n` +
    `[L]Alt: ${data.pelanggan.alamat}\n` +
    `[L]Tel: ${data.pelanggan.nomor_hp}\n` +
    "[L]\n\n" +
    `[C]WENING LAUNDRY\n` +
    `[C]www.wening-laundry.com\n` +
    `[C]0821-2266-1353\n` +
    `[C]Jalan Gongseng Barat Raya 2\n` +
    `[C]Cijantung\n` +
    "[L]\n\n" +
    "[C]Ketentuan\n" +
    "[L]a. Pengambilan barang WAJIB disertai nota Asli (Whatsapp/Print)\n" +
    "[L]b. Barang yang tidak diambil dalam 1 Bulan, Hilang/Rusak diluar tanggung jawab kami\n" +
    "[L]c. Klaim LUNTUR tidak dipisah diluar tanggung jawab kami\n" +
    "[L]d. Menghilangkan noda harus direquest dan dikenakan biaya tambahan\n" +
    "[L]e. Hak klaim berlaku 1x24 jam setelah barang diambil (Diluar jam tersebut komplain tidak akan diproses)\n" +
    "[L]f. Penggantian barang rusak/luntur tidak dapat diganti dengan harga baru\n" +
    "[L]f. Dengan menerima NOTA ini, maka pelanggan dianggap setuju dengan Syarat & Ketentuan pelayanan WENING LAUNDRY\n" +
    "[L]\n\n\n"
  ].join('\n');

  const Android = (window as any).Android;
  if (!Android) {
    console.log(output);
    alert("Android interface is not available, make sure you access this app from JadiApp Browser");
    return false;
  }

  if (!Android.isBluetoothPermissionGranted()) {
    Android.askBluetoothPermission();
    return false;
  }

  Android.printOnFirstPairedBluetooth(output);
  return true;
}
