import { Form, Input, Radio, Select, DatePicker, AutoComplete } from "antd"
import moment from "moment"
// eslint-disable-next-line import/no-anonymous-default-export
export default ({ formModal },
    { handleOkFormEdit },
    { changeListSaleStaff },
    { dayjs },
    { isGenCode },
    { onChangeCreateCode },
    { dateFormat },
    { changeListProvinces },
    { listPhoneFilter },
    { changeListPhoneNumber },
    { allDeliveryOrders },
    { handleSelectShipperPhone },
    { handleSearchPhone },
    { handleSelectConsigneePhone },
    { lstSelect }) => {
    return <Form
        name="formModal"
        form={formModal}
        id="formModal"
        autoComplete="off"
        onFinish={handleOkFormEdit}
        initialValues={
            {
                isGenCode: false,
                saleStaff: changeListSaleStaff()[0]?.value,
                orderDate: dayjs(moment())
            }
        }
    >
        <div className="form__input">
            <div className="form__input__item">
                <p className="form__input__item--special" style={{ display: "none" }}>ID</p>
                <Form.Item
                    name="id"
                    style={{
                        display: "none"
                    }}
                >
                    <Input type={"text"} className="input input--edit"></Input>
                </Form.Item>
            </div>
        </div>

        <div className="form__input">
            <div className="form__input__item">
                <p className="form__input__item--special">Tạo mã vận đơn</p>
                <Form.Item
                    name="isGenCode"
                >
                    <Radio.Group value={isGenCode} onChange={onChangeCreateCode}>
                        <Radio value={true}>Tạo</Radio>
                        <Radio value={false}>Không tạo</Radio>
                    </Radio.Group>
                </Form.Item>
            </div>

            <div className="form__input__item">
                <p className="form__input__item--special">Nhân viên kinh doanh</p>
                <Form.Item
                    name="saleStaff"
                    style={{
                        width: "300px"
                    }}
                >
                    <Select
                        options={changeListSaleStaff()}
                    />
                </Form.Item>
            </div>
        </div>

        <div className="form__input">
            <div className="form__input__item">
                <p className="form__input__item--special">Số mã</p>
                <Form.Item
                    name="id"
                >
                    <Input className="input input--max" type="text" disabled style={{ color: "#ffbd2f", fontSize: "14.5px" }}></Input>
                </Form.Item>
            </div>

            <div className="form__input__item">
                <p className="form__input__item--special">Ngày tạo</p>
                <Form.Item
                    name="orderDate"
                >
                    <DatePicker className="date" placeholder="Chọn ngày tạo đơn" format={dateFormat} />
                </Form.Item>
            </div>
        </div>

        <div className="form__input">
            <div className="form__input__item">
                <p className="form__input__item--special">Người gửi</p>
                <Form.Item
                    name="shipper"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập tên người gửi',
                        },
                    ]}
                >
                    <Input className="input input--max" type="text"></Input>
                </Form.Item>
            </div>

            <div className="form__input__item">
                <p className="form__input__item--special">Người nhận</p>
                <Form.Item
                    name="consignee"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập tên người nhận',
                        },
                    ]}
                >
                    <Input className="input input--max" type="text"></Input>
                </Form.Item>
            </div>
        </div>

        <div className="form__input">
            <div className="form__input__item">
                <p className="form__input__item--special">Địa chỉ gửi</p>
                <Form.Item
                    name="toAddress"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập địa chỉ gửi',
                        },
                    ]}
                >
                    <Input className="input input--max" type="text"></Input>
                </Form.Item>
            </div>

            <div className="form__input__item parent">
                <div className="form__input__item--child">
                    <p className="form__input__item--special">Địa chỉ nhận</p>
                    <Form.Item
                        name="fromAddress"
                        rules={[
                            {
                                required: true,
                                message: 'Nhập địa chỉ nhận',
                            },
                        ]}
                    >
                        <Input className="input input--middle" type="text"></Input>
                    </Form.Item>
                </div>

                <div className="form__input__item--child">
                    <p className="form__input__item--special">Tỉnh</p>
                    <Form.Item
                        name="provinceCode"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn tỉnh',
                            },
                        ]}
                        style={{
                            width: "120px"
                        }}
                    >
                        <Select
                            holder={"Chọn tỉnh"}
                            options={changeListProvinces()}>
                        </Select>
                    </Form.Item>
                </div>
            </div>
        </div>

        <div className="form__input">
            <div className="form__input__item">
                <p className="form__input__item--special">Số điện thoại gửi</p>
                <Form.Item
                    name="shipperPhone"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập số điện thoại người gửi',
                        },
                    ]}

                >
                    <AutoComplete
                        className={'select__item select--max'}
                        options={listPhoneFilter?.length > 0 ? changeListPhoneNumber(listPhoneFilter) : changeListPhoneNumber(allDeliveryOrders.listPhone)}
                        style={{
                            width: 300
                        }}
                        onSelect={(value, option) => handleSelectShipperPhone(option.id)}
                        onSearch={(value) => { handleSearchPhone(value) }}
                    />
                </Form.Item>
            </div>

            <div className="form__input__item">
                <p className="form__input__item--special">Số điện thoại người nhận</p>
                <Form.Item
                    name="consigneePhone"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập số điện thoại người nhận',
                        },
                    ]}
                >
                    <AutoComplete
                        className={'select__item select--max'}
                        options={listPhoneFilter?.length > 0 ? changeListPhoneNumber(listPhoneFilter) : changeListPhoneNumber(allDeliveryOrders.listPhone)}
                        style={{
                            width: 300
                        }}
                        onSelect={(value, option) => handleSelectConsigneePhone(option.id)}
                        onSearch={(value) => { handleSearchPhone(value) }}
                    />
                </Form.Item>
            </div>
        </div>

        <div className="form__input">
            <div className="form__input__item">
                <p className="form__input__item--special">Hình thức nhận hàng</p>
                <Form.Item
                    name="sendType"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng chọn hình thức nhận hàng',
                        },
                    ]}
                    style={{
                        width: 300
                    }}
                >
                    <Select
                        options={[{ value: "Tận nơi", label: "Tận nơi" }, { value: "Tại kho", label: "Tại kho" }]}>
                    </Select>
                </Form.Item>
            </div>

            <div className="form__input__item">
                <p className="form__input__item--special">Hình thức giao hàng</p>
                <Form.Item
                    name="receiveType"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng chọn hình thức giao hàng',
                        },
                    ]}
                    style={{
                        width: 300
                    }}
                >
                    <Select
                        options={[{ value: "Tận nơi", label: "Tận nơi" }, { value: "Tại kho", label: "Tại kho" }, { value: "Quốc lộ", label: "Quốc lộ" }]}>
                    </Select>
                </Form.Item>
            </div>
        </div>

        <div className="form__input">
            <div className="form__input__item">
                <p className="form__input__item--special">Hình thức thanh toán</p>
                <Form.Item
                    name="paymentType"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng chọn hình thức thanh toán',
                        },
                    ]}
                    style={{
                        width: 300
                    }}
                >
                    <Select
                        options={lstSelect[1].lstOption}>
                    </Select>
                </Form.Item>
            </div>

            <div className="form__input__item">
                <p className="form__input__item--special">Cước vận chuyển</p>
                <Form.Item
                    name="totalAmount"
                    rules={[
                        {
                            required: true,
                            message: 'Nhập cước vận chuyển',
                        },
                    ]}
                >
                    <Input type={"number"} className="input input--max"></Input>
                </Form.Item>
            </div>
        </div>

        <div className="form__input">
            <div className="form__input__item">
                <p className="form__input__item--special">Phát sinh khác</p>
                <Form.Item
                    name="note"
                >
                    <Input type={"text"} className="input input--max"></Input>
                </Form.Item>
            </div>


        </div>
    </Form>
}