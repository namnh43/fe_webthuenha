import {Avatar, Typography} from "@mui/material";

export function HostProfileContent(props) {
    const { username, firstName, lastName, phoneNumber, addressId, blocked } = props;

    return (
        <div>
            <Avatar sx={{ width: 100, height: 100 }} />
            <Typography variant="h5">{username}</Typography>
            <Typography variant="subtitle1">Họ và tên: {firstName} {lastName}</Typography>
            <Typography variant="subtitle1">Số điện thoại: {phoneNumber}</Typography>
            <Typography variant="subtitle1">Địa chỉ: {addressId}</Typography>
            <Typography variant="subtitle1">Trạng thái: {blocked ? 'Đang hoạt động' : 'Bị khóa'}</Typography>
            {/*<Typography variant="subtitle1">Tổng doanh thu: {totalRevenue}</Typography>*/}
        </div>
    );
}