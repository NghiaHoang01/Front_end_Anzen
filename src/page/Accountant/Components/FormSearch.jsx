import { Form, Input, Button, Checkbox, DatePicker } from 'antd'
import dayjs from 'dayjs'
import moment from 'moment'
// eslint-disable-next-line import/no-anonymous-default-export
export default ({ formSearch },
    { handelSearch },
    { checkedSearch },
    { onCheckedSearch }) => {

    const { RangePicker } = DatePicker
    const dateFormat = "DD/MM/YYYY"

    return <Form
        name="basic"
        form={formSearch}
        onFinish={handelSearch}
        autoComplete="off"
        initialValues={
            {
                CreatedDate: [dayjs("01/01/2022"), moment()]
            }
        }
    >
        <div className="seacrh__input">
            <div className="seacrh__input__item">

                <div className="form__input__item">
                    <p className="seacrh__input__item-title">Mã bảng kê</p>
                    <Form.Item
                        name="Code"
                        style={{
                            width: "300px"
                        }}
                    >
                        <Input className="input input--max" type="text" ></Input>
                    </Form.Item>
                </div>

                <div className="form__input__item">
                    <p className="seacrh__input__item-title">SĐT Tài xế</p>
                    <Form.Item
                        name="DriverPhone"
                        style={{
                            width: "300px"
                        }}
                    >
                        <Input className="input input--max" type="text" ></Input>
                    </Form.Item>
                </div>

                <div className="form__input__item">
                    <p className="seacrh__input__item-title">Biển số xe</p>
                    <Form.Item
                        name="LicensePlate"
                        style={{
                            width: "300px"
                        }}
                    >
                        <Input className="input input--max" type="text" ></Input>
                    </Form.Item>
                </div>

                <div className="form__input__item">
                    <p className="seacrh__input__item-title">Từ ngày - Đến ngày</p>
                    <Form.Item
                        name="CreatedDate"
                        style={{
                            width: "300px"
                        }}
                    >
                        <RangePicker format={dateFormat} />
                    </Form.Item>
                </div>
            </div>

            <div className="seacrh__input__item wrap " style={{ display: checkedSearch ? "flex" : "none" }}>
                <div className="form__input__item">
                    <p className="seacrh__input__item-title">Tài xế</p>
                    <Form.Item
                        name="Driver"
                        style={{
                            width: "300px"
                        }}
                    >
                        <Input className="input input--max" type="text" ></Input>
                    </Form.Item>
                </div>

                <div className="form__input__item">
                    <p className="seacrh__input__item-title">Tên đối tác</p>
                    <Form.Item
                        name="Partner"
                        style={{
                            width: "300px"
                        }}
                    >
                        <Input className="input input--max" type="text" ></Input>
                    </Form.Item>
                </div>

                <div className="form__input__item">
                    <p className="seacrh__input__item-title">SĐT Đối tác</p>
                    <Form.Item
                        name="PartnerPhone"
                    >
                        <Input className="input input--max" type="text" ></Input>
                    </Form.Item>
                </div>

                <div className="form__input__item">
                    <p className="seacrh__input__item-title">Tổng số tiền từ</p>
                    <Form.Item
                        name="TotalFreightFrom"
                    >
                        <Input className="input input--max" type="number" ></Input>
                    </Form.Item>
                </div>

                <div className="form__input__item">
                    <p className="seacrh__input__item-title">Tổng số tiền đến</p>
                    <Form.Item
                        name="TotalFreightTo"
                    >
                        <Input className="input input--max" type="number" ></Input>
                    </Form.Item>
                </div>
            </div>
        </div>

        <div className="seacrh__action">
            <div className="seacrh__action-btn">

                <Button type="primary" htmlType="reset">Clear</Button>

                <Button type="primary" htmlType="submit">Tìm kiếm</Button>

                <Checkbox className="chkSearch" onChange={onCheckedSearch}>Tìm kiếm nâng cao</Checkbox>
            </div>
        </div>
    </Form>
}