import { Transaksi } from '../model/table/Transaksi'
import { Pelanggan } from '../model/table/Pelanggan'
import { TransaksiDetail } from '../model/table/TransaksiDetail'

export interface TransaksiFulldata {
  transaksi: Transaksi
  pelanggan: Pelanggan
  list_item: TransaksiDetail[]
}