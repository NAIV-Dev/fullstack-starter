import { Layanan } from '@/api-client/model/table/Layanan';
import { TransaksiFulldata } from '@/api-client/schema/TransaksiFulldata';
import { Button } from '@heroui/react';
import jsPDF from 'jspdf';
import { Download } from 'lucide-react';

interface DownloadButtonProps {
  data: TransaksiFulldata
  listLayanan: Layanan[]
}

export function DownloadButton(props: DownloadButtonProps) {
  const handlePrint = () => {
    function createDoc(pdf?: jsPDF) {
      const doc = pdf ?? new jsPDF({
        orientation: 'p',
        format: [5, 8].map(x => x),
        unit: 'cm',
      });

      const formatter_num = new Intl.NumberFormat('id-ID', { maximumFractionDigits: 2 });

      // Adding the fonts.
      doc.setFontSize(10);
      doc.setFillColor('#000');
      doc.addImage(imgsrc, 'png', 1, 0, 3.1, 3);
      doc.setFont('', 'normal').text(props.data.transaksi.nomor_transaksi, 2.5, 3.3, { maxWidth: 5, align: 'center' }).setFont('', 'normal');

      doc.setFontSize(10);

      doc.setFont('', 'normal').text('Name', .1, 4, { maxWidth: 5, align: 'left' }).setFont('', 'normal');
      doc.text(': ' + props.data.pelanggan.nama, 1.8, 4, { maxWidth: 5, align: 'left' });

      doc.setFont('', 'normal').text('Phone', .1, 4.45, { maxWidth: 5, align: 'left' }).setFont('', 'normal');
      doc.text(': ' + props.data.pelanggan.nomor_hp, 1.8, 4.45, { maxWidth: 5, align: 'left' });

      doc.setFontSize(8);

      doc.setFont('', 'normal').text('Items', .1, 5, { maxWidth: 2.3, align: 'left' }).setFont('', 'normal');
      doc.setFont('', 'normal').text('Amt', 2.45, 5, { maxWidth: 1, align: 'left' }).setFont('', 'normal');
      doc.setFont('', 'normal').text('Price', 3, 5, { maxWidth: 1, align: 'left' }).setFont('', 'normal');
      doc.setFont('', 'normal').text('SubT', 3.9, 5, { maxWidth: 1, align: 'left' }).setFont('', 'normal');

      doc.setLineWidth(.015).line(.1, 5.15, 4.9, 5.15);

      let y = 5.45;
      for (const item of props.data.list_item) {
        const layanan = props.listLayanan.find(l => l.id == item.layanan_id)!;
        const max_height = Math.max(
          doc.getTextDimensions(layanan.nama ?? '', { maxWidth: 2.3 }).h,
          doc.getTextDimensions('' + String(item.jumlah), { maxWidth: 1 }).h,
          doc.getTextDimensions('' + formatter_num.format(+layanan.harga_satuan), { maxWidth: 1 }).h,
          doc.getTextDimensions('' + formatter_num.format(+item.subtotal), { maxWidth: 1 }).h,
        );
        doc.setFont('', 'normal').text(layanan.nama, .1, y, { maxWidth: 2.3, align: 'left' }).setFont('', 'normal');
        doc.setFont('', 'normal').text('' + +(item.jumlah || 0), 2.45, y, { maxWidth: 1, align: 'left' }).setFont('', 'normal');
        doc.setFont('', 'normal').text('' + formatter_num.format(+layanan.harga_satuan), 3, y, { maxWidth: 1, align: 'left' }).setFont('', 'normal');
        doc.setFont('', 'normal').text('' + formatter_num.format(+item.subtotal), 3.9, y, { maxWidth: 1, align: 'left' }).setFont('', 'normal');
        y += max_height + .12;
      }

      doc.setLineWidth(.015).line(.1, y - .22, 4.9, y - .22);
      y += .12;

      doc.setFontSize(8.5);
      doc.setFont('', 'normal').text('Total', 2.9, y, { maxWidth: 1, align: 'left' }).setFont('', 'normal');
      doc.setFont('', 'normal').text('' + formatter_num.format(+props.data.transaksi.total_harga), 3.87, y, { maxWidth: 1, align: 'left' }).setFont('', 'normal');

      y += .7;
      doc.setFontSize(8);
      doc.setFont('', 'bold').text('Wening Laundry', .1, y, { maxWidth: 5, align: 'left' }).setFont('', 'normal');

      y += .25;
      doc.setFontSize(8);
      // doc.addImage('https://upload.wikimedia.org/wikipedia/commons/c/c4/Globe_icon.svg', 'png', .1, y, .23, .23);
      doc.setFont('', 'bold').text('WEB', .1, y + .2, { maxWidth: 4.3, align: 'left' }).setFont('', 'normal');
      doc.setFont('', 'normal').text('wening-laundry.com', .9, y + .16, { maxWidth: 4.3, align: 'left' }).setFont('', 'normal');

      y += .36;
      // doc.addImage('https://static-00.iconduck.com/assets.00/alternate-phone-icon-256x256-e459268b.png', 'png', .1, y, .23, .23);
      doc.setFont('', 'bold').text('TEL', .1, y + .2, { maxWidth: 4.3, align: 'left' }).setFont('', 'normal');
      doc.setFont('', 'normal').text('0812-2266-1353', .9, y + .2, { maxWidth: 4.3, align: 'left' }).setFont('', 'normal');

      y += .36;
      // doc.addImage('https://cdn-icons-png.flaticon.com/256/74/74627.png', 'png', .1, y, .23, .23);
      doc.setFont('', 'bold').text('ALT', .1, y + .2, { maxWidth: 4.3, align: 'left' }).setFont('', 'normal');
      doc.setFont('', 'normal').text('Jalan Gongseng Barat Raya', .9, y + .2, { maxWidth: 4.3, align: 'left' }).setFont('', 'normal');

      y += .8;
      doc.setFont('', 'normal').text('TERIMA KASIH', 2.5, y, { maxWidth: 5, align: 'center' }).setFont('', 'normal');

      y += .8;
      doc.text(`\
Ketentuan:
a. Pengambilan barang WAJIB disertai nota Asli (Whatsapp/Print)
b. Barang yang tidak diambil dalam 1 Bulan, Hilang/Rusak diluar tanggung jawab kami
c. Klaim LUNTUR tidak dipisah diluar tanggung jawab kami
d. Menghilangkan noda harus direquest dan dikenakan biaya tambahan
e. Hak klaim berlaku 1x24 jam setelah barang diambil (Diluar jam tersebut komplain tidak akan diproses)
f. Penggantian barang rusak/luntur tidak dapat diganti dengan harga baru
f. Dengan menerima NOTA ini, maka pelanggan dianggap setuju dengan Syarat & Ketentuan pelayanan WENING LAUNDRY

`, .1, y, { maxWidth: 4.8 });

      y += 3.1;
      return y;
    }

    const last_y = createDoc();
    const doc = new jsPDF({
      orientation: 'p',
      format: [5, last_y + 4].map(x => x),
      unit: 'cm',
    });
    createDoc(doc);
    doc.save(`receipt-${new Date().getTime()}`);
  };

  return (
    <Button
      onPress={handlePrint}
      variant='bordered'
      className={`!min-w-0`}
      size={'sm'}>
      <Download size={14} />
    </Button>
  );
}

const imgsrc = 'data:image/png;base64,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';
