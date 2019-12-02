const IS_DEV = process.env.NODE_ENV !== 'production';
export const API_ROOT = IS_DEV ? 'http://192.168.18.107:8080/qxiao-cms/' : 'http://ring.qxiao.net/qxiao-cms/';
