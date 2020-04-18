// Phục vụ cho việc đóng mở các modal tại màn hình chi tiết hợp đồng
const defaultState = {
    modalNguoiTaoHD:false,
    modalGiaHanKy:false,
    modalTraBotGoc:false,
    modalVayThem:false,
    modalNhanTin:false,
    modalGuiMail:false,
    modalXoaHopDong:false,
    modalTTNguoiThucHien:false,
};
const openModalReducers = (state = defaultState, action) => {
    switch (action.type) {
        case 'OPEN_MODAL_NGUOITAO_HD': {
            return  {
                ...defaultState,
                modalNguoiTaoHD:true
            };
        }
        case 'CLOSE_MODAL_NGUOITAO_HD': {
            return  {
                ...defaultState,
                modalNguoiTaoHD:false
            };
        }
        case 'OPEN_MODAL_GIAHANKY': {
            return  {
                ...defaultState,
                modalGiaHanKy:true
            };
        }
        case 'CLOSE_MODAL_GIAHANKY': {
            return  {
                ...defaultState,
                modalGiaHanKy:false
            };
        }
        case 'OPEN_MODAL_TRABOTGOC': {
            return  {
                ...defaultState,
                modalTraBotGoc:true
            };
        }
        case 'CLOSE_MODAL_TRABOTGOC': {
            return  {
                ...defaultState,
                modalTraBotGoc:false
            };
        }
        case 'OPEN_MODAL_VAYTHEM': {
            return  {
                ...defaultState,
                modalVayThem:true
            };
        }
        case 'CLOSE_MODAL_VAYTHEM': {
            return  {
                ...defaultState,
                modalVayThem:false
            };
        }
        case 'OPEN_MODAL_NHANTIN': {
            return  {
                ...defaultState,
                modalNhanTin:true
            };
        }
        case 'CLOSE_MODAL_NHANTIN': {
            return  {
                ...defaultState,
                modalNhanTin:false
            };
        }
        case 'OPEN_MODAL_GUIMAIL': {
            return  {
                ...defaultState,
                modalGuiMail:true
            };
        }
        case 'CLOSE_MODAL_GUIMAIL': {
            return  {
                ...defaultState,
                modalGuiMail:false
            };
        }
        case 'OPEN_MODAL_XOAHOPDONG': {
            return  {
                ...defaultState,
                modalXoaHopDong:true
            };
        }
        case 'CLOSE_MODAL_XOAHOPDONG': {
            return  {
                ...defaultState,
                modalXoaHopDong:false
            };
        }
        case 'OPEN_MODAL_TT_NGUOITHUCHIEN': {
            return  {
                ...defaultState,
                modalTTNguoiThucHien:true
            };
        }
        case 'CLOSE_MODAL_TT_NGUOITHUCHIEN': {
            return  {
                ...defaultState,
                modalTTNguoiThucHien:false
            };
        }
        default:
            return state
    }
}

export default openModalReducers;