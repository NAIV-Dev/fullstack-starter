import axios from 'axios';
import { T_adminGetKasir } from "./api/adminGetKasir";
import { T_adminCreateKasir } from "./api/adminCreateKasir";
import { T_adminGetKasirByID } from "./api/adminGetKasirByID";
import { T_adminUpdateKasirByID } from "./api/adminUpdateKasirByID";
import { T_adminDeleteKasirByID } from "./api/adminDeleteKasirByID";
import { T_adminResetPasswordKasirByID } from "./api/adminResetPasswordKasirByID";
import { T_adminGetLayanan } from "./api/adminGetLayanan";
import { T_adminCreateLayanan } from "./api/adminCreateLayanan";
import { T_adminGetLayananByID } from "./api/adminGetLayananByID";
import { T_adminUpdateLayananByID } from "./api/adminUpdateLayananByID";
import { T_adminDeleteLayananByID } from "./api/adminDeleteLayananByID";
import { T_adminGetPelanggan } from "./api/adminGetPelanggan";
import { T_adminCreatePelanggan } from "./api/adminCreatePelanggan";
import { T_adminGetPelangganByID } from "./api/adminGetPelangganByID";
import { T_adminUpdatePelangganByID } from "./api/adminUpdatePelangganByID";
import { T_adminDeletePelangganByID } from "./api/adminDeletePelangganByID";
import { T_adminGetPengeluaran } from "./api/adminGetPengeluaran";
import { T_adminCreatePengeluaran } from "./api/adminCreatePengeluaran";
import { T_adminGetPengeluaranByID } from "./api/adminGetPengeluaranByID";
import { T_adminUpdatePengeluaranByID } from "./api/adminUpdatePengeluaranByID";
import { T_adminDeletePengeluaranByID } from "./api/adminDeletePengeluaranByID";
import { T_adminGetTransaksi } from "./api/adminGetTransaksi";
import { T_adminCreateTransaksi } from "./api/adminCreateTransaksi";
import { T_adminGetTransaksiByID } from "./api/adminGetTransaksiByID";
import { T_adminUpdateTransaksiByID } from "./api/adminUpdateTransaksiByID";
import { T_adminDeleteTransaksiByID } from "./api/adminDeleteTransaksiByID";
import { T_adminDashboard } from "./api/adminDashboard";
import { T_adminProfile } from "./api/adminProfile";
import { T_adminUpdateProfile } from "./api/adminUpdateProfile";
import { T_adminUpdatePassword } from "./api/adminUpdatePassword";
import { T_login } from "./api/login";
import { T_kasirDashboard } from "./api/kasirDashboard";
import { T_kasirTranasksiHariIni } from "./api/kasirTranasksiHariIni";
import { T_kasirCreateTransaksi } from "./api/kasirCreateTransaksi";
import { T_kasirGetTransaksiByID } from "./api/kasirGetTransaksiByID";
import { T_kasirUpdateTransaksiByID } from "./api/kasirUpdateTransaksiByID";
import { T_kasirDeleteTransaksiByID } from "./api/kasirDeleteTransaksiByID";
import { T_kasirGetTotalTransaksiHariIni } from "./api/kasirGetTotalTransaksiHariIni";

export namespace AxiosClient {

  function __build_path(base_url: string, url_path: string, path_param: { [key: string]: any }) {
    const build_path = url_path.replace(/:([a-zA-Z_]\w*)/g, (_, key) => {
      if (path_param[key] === undefined) {
        throw new Error(`Missing param: ${key}`);
      }
      return encodeURIComponent(String(path_param[key]));
    });
    const url = new URL(build_path, base_url);
    return url.toString();
  }
  export class BaseURL {
    public base_url: string = '';
    static _instance: BaseURL | undefined;
    public static get instance(): BaseURL {
      if (!BaseURL._instance) {
        BaseURL._instance = new BaseURL();
      }
      return BaseURL._instance;
    }
    private constructor(){}
    public set(_base_url: string) {
      this.base_url = _base_url;
    }
  }

  export const adminGetKasir: T_adminGetKasir = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/admin/kasir', {});
    return (await axios['get'](final_url, { headers: req.headers as any, params: req.query as any, })).data as any;
  }
  export const adminCreateKasir: T_adminCreateKasir = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/admin/kasir', {});
    return (await axios['post'](final_url, req.body, { headers: req.headers as any, })).data as any;
  }
  export const adminGetKasirByID: T_adminGetKasirByID = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/admin/kasir/:id', req.path);
    return (await axios['get'](final_url, { headers: req.headers as any, })).data as any;
  }
  export const adminUpdateKasirByID: T_adminUpdateKasirByID = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/admin/kasir/:id', req.path);
    return (await axios['put'](final_url, req.body, { headers: req.headers as any, })).data as any;
  }
  export const adminDeleteKasirByID: T_adminDeleteKasirByID = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/admin/kasir/:id', req.path);
    return (await axios['delete'](final_url, { headers: req.headers as any, })).data as any;
  }
  export const adminResetPasswordKasirByID: T_adminResetPasswordKasirByID = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/admin/kasir/:id/reset-password', req.path);
    return (await axios['post'](final_url, req.body, { headers: req.headers as any, })).data as any;
  }
  export const adminGetLayanan: T_adminGetLayanan = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/admin/layanan', {});
    return (await axios['get'](final_url, { headers: req.headers as any, params: req.query as any, })).data as any;
  }
  export const adminCreateLayanan: T_adminCreateLayanan = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/admin/layanan', {});
    return (await axios['post'](final_url, req.body, { headers: req.headers as any, })).data as any;
  }
  export const adminGetLayananByID: T_adminGetLayananByID = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/admin/layanan/:id', req.path);
    return (await axios['get'](final_url, { headers: req.headers as any, })).data as any;
  }
  export const adminUpdateLayananByID: T_adminUpdateLayananByID = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/admin/layanan/:id', req.path);
    return (await axios['put'](final_url, req.body, { headers: req.headers as any, })).data as any;
  }
  export const adminDeleteLayananByID: T_adminDeleteLayananByID = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/admin/layanan/:id', req.path);
    return (await axios['delete'](final_url, { headers: req.headers as any, })).data as any;
  }
  export const adminGetPelanggan: T_adminGetPelanggan = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/admin/pelanggan', {});
    return (await axios['get'](final_url, { headers: req.headers as any, params: req.query as any, })).data as any;
  }
  export const adminCreatePelanggan: T_adminCreatePelanggan = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/admin/pelanggan', {});
    return (await axios['post'](final_url, req.body, { headers: req.headers as any, })).data as any;
  }
  export const adminGetPelangganByID: T_adminGetPelangganByID = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/admin/pelanggan/:id', req.path);
    return (await axios['get'](final_url, { headers: req.headers as any, })).data as any;
  }
  export const adminUpdatePelangganByID: T_adminUpdatePelangganByID = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/admin/pelanggan/:id', req.path);
    return (await axios['put'](final_url, req.body, { headers: req.headers as any, })).data as any;
  }
  export const adminDeletePelangganByID: T_adminDeletePelangganByID = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/admin/pelanggan/:id', req.path);
    return (await axios['delete'](final_url, { headers: req.headers as any, })).data as any;
  }
  export const adminGetPengeluaran: T_adminGetPengeluaran = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/admin/pengeluaran', {});
    return (await axios['get'](final_url, { headers: req.headers as any, params: req.query as any, })).data as any;
  }
  export const adminCreatePengeluaran: T_adminCreatePengeluaran = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/admin/pengeluaran', {});
    return (await axios['post'](final_url, req.body, { headers: req.headers as any, })).data as any;
  }
  export const adminGetPengeluaranByID: T_adminGetPengeluaranByID = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/admin/pengeluaran/:id', req.path);
    return (await axios['get'](final_url, { headers: req.headers as any, })).data as any;
  }
  export const adminUpdatePengeluaranByID: T_adminUpdatePengeluaranByID = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/admin/pengeluaran/:id', req.path);
    return (await axios['put'](final_url, req.body, { headers: req.headers as any, })).data as any;
  }
  export const adminDeletePengeluaranByID: T_adminDeletePengeluaranByID = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/admin/pengeluaran/:id', req.path);
    return (await axios['delete'](final_url, { headers: req.headers as any, })).data as any;
  }
  export const adminGetTransaksi: T_adminGetTransaksi = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/admin/transaksi', {});
    return (await axios['get'](final_url, { headers: req.headers as any, params: req.query as any, })).data as any;
  }
  export const adminCreateTransaksi: T_adminCreateTransaksi = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/admin/transaksi', {});
    return (await axios['post'](final_url, req.body, { headers: req.headers as any, })).data as any;
  }
  export const adminGetTransaksiByID: T_adminGetTransaksiByID = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/admin/transaksi/:id', req.path);
    return (await axios['get'](final_url, { headers: req.headers as any, })).data as any;
  }
  export const adminUpdateTransaksiByID: T_adminUpdateTransaksiByID = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/admin/transaksi/:id', req.path);
    return (await axios['put'](final_url, req.body, { headers: req.headers as any, })).data as any;
  }
  export const adminDeleteTransaksiByID: T_adminDeleteTransaksiByID = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/admin/transaksi/:id', req.path);
    return (await axios['delete'](final_url, { headers: req.headers as any, })).data as any;
  }
  export const adminDashboard: T_adminDashboard = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/admin/dashboard', {});
    return (await axios['get'](final_url, { headers: req.headers as any, })).data as any;
  }
  export const adminProfile: T_adminProfile = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/admin/profile', {});
    return (await axios['get'](final_url, { headers: req.headers as any, })).data as any;
  }
  export const adminUpdateProfile: T_adminUpdateProfile = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/admin/profile', {});
    return (await axios['put'](final_url, req.body, { headers: req.headers as any, })).data as any;
  }
  export const adminUpdatePassword: T_adminUpdatePassword = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/admin/password', {});
    return (await axios['put'](final_url, req.body, { headers: req.headers as any, })).data as any;
  }
  export const login: T_login = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/login', {});
    return (await axios['post'](final_url, req.body, { })).data as any;
  }
  export const kasirDashboard: T_kasirDashboard = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/kasir/dashboard', {});
    return (await axios['get'](final_url, { headers: req.headers as any, })).data as any;
  }
  export const kasirTranasksiHariIni: T_kasirTranasksiHariIni = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/kasir/transaksi-hari-ini', {});
    return (await axios['get'](final_url, { headers: req.headers as any, })).data as any;
  }
  export const kasirCreateTransaksi: T_kasirCreateTransaksi = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/kasir/transaksi-hari-ini', {});
    return (await axios['post'](final_url, req.body, { headers: req.headers as any, })).data as any;
  }
  export const kasirGetTransaksiByID: T_kasirGetTransaksiByID = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/kasir/transaksi-hari-ini/:id', req.path);
    return (await axios['get'](final_url, { headers: req.headers as any, })).data as any;
  }
  export const kasirUpdateTransaksiByID: T_kasirUpdateTransaksiByID = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/kasir/transaksi-hari-ini/:id', req.path);
    return (await axios['put'](final_url, req.body, { headers: req.headers as any, })).data as any;
  }
  export const kasirDeleteTransaksiByID: T_kasirDeleteTransaksiByID = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/kasir/transaksi-hari-ini/:id', req.path);
    return (await axios['delete'](final_url, { headers: req.headers as any, })).data as any;
  }
  export const kasirGetTotalTransaksiHariIni: T_kasirGetTotalTransaksiHariIni = async (req, base_url: string = BaseURL.instance.base_url) => {
    const final_url = __build_path(base_url, '/kasir/total-hari-ini', {});
    return (await axios['get'](final_url, { headers: req.headers as any, })).data as any;
  }
}