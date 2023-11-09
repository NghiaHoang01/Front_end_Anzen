// eslint-disable-next-line import/no-anonymous-default-export
export default ({ totalAmount },
    { additionalAmount }) => {
    return <>
        <table className="table-price">
            <tbody>
                <tr >
                    <th>Giá bán</th>
                    <th>Thành tiền</th>
                </tr>
                <tr>
                    <td>Bán ra</td>
                    <td>{totalAmount}</td>
                </tr>
                <tr>
                    <td>Phát sinh khác</td>
                    <td>{additionalAmount}</td>
                </tr>
                <tr>
                    <td>Tổng giá bán</td>
                    <td>{totalAmount + additionalAmount}</td>
                </tr>
            </tbody>
        </table>
    </>
}