import { Form, Input, Button, DatePicker } from "antd"
import moment from "moment";
import dayjs from "dayjs";
// eslint-disable-next-line import/no-anonymous-default-export
export default ({ formSearch },
    { onFinshFormSearch },
    { handleCreateNewCustomer }) => {

    const dateFormat = "DD/MM/YYYY"
    const { RangePicker } = DatePicker;

    return <Form
        name="basic"
        form={formSearch}
        initialValues={{
            createdDate: [dayjs('2022/01/01'), dayjs(moment())]
        }}
        onFinish={onFinshFormSearch}
        autoComplete="off">
        <div className="seacrh__input no--stretch">
            <div className="seacrh__input__item">

                <div className="form__input__item">
                    <p className="seacrh__input__item-title">Số điện toại</p>
                    <Form.Item
                        name="phone"
                        style={{
                            width: "300px"
                        }}
                    >
                        <Input className="input input--max" type="text" ></Input>
                    </Form.Item>
                </div>

                <div className="form__input__item">
                    <p className="seacrh__input__item-title">Tên khách hàng</p>
                    <Form.Item
                        name="name"
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
                        name="createdDate"
                        style={{
                            width: "300px"
                        }}
                    >
                        <RangePicker format={dateFormat} />
                    </Form.Item>
                </div>
            </div>
        </div>

        <div className="seacrh__action">
            <div className="seacrh__action-btn">

                <Button type="primary" htmlType="reset">Clear</Button>

                <Button type="primary" htmlType="submit">Tìm kiếm</Button>

                <Button type="primary" onClick={''}>Export Excel</Button>

                <Button type="primary" onClick={handleCreateNewCustomer} >Tạo đơn mới</Button>
            </div>
        </div>
    </Form>
}