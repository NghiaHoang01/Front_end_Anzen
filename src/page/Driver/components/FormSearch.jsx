import { Form, Button, Input, DatePicker, Checkbox } from 'antd'
// eslint-disable-next-line import/no-anonymous-default-export
export default ({ formSearch },
    { onFinishFormSearch },
    { dayjs },
    { moment },
    { checkSearch },
    { handelCreateNewDriver },
    { onChecked }) => {

    const { RangePicker } = DatePicker;
    const dateFormat = "DD/MM/YYYY";

    return <Form
        name="basic"
        form={formSearch}
        onFinish={onFinishFormSearch}
        initialValues={{
            CreatedDate: [dayjs("2022/01/01"), dayjs(moment())],
        }}
    >
        <div className="seacrh__input">
            <div className="seacrh__input__item">
                <div className="form__input__item">
                    <p className="seacrh__input__item-title">Biển số xe</p>
                    <Form.Item name="licensePlate">
                        <Input className="input input--max" type="text"></Input>
                    </Form.Item>
                </div>

                <div className="form__input__item">
                    <p className="seacrh__input__item-title">Tên</p>
                    <Form.Item
                        name="Name"
                        style={{
                            width: "300px",
                        }}
                    >
                        <Input className="input input--max" type="text"></Input>
                    </Form.Item>
                </div>

                <div className="form__input__item">
                    <p className="seacrh__input__item-title">Số điện thoại</p>
                    <Form.Item
                        name="Phone"
                        style={{
                            width: "300px",
                        }}
                    >
                        <Input className="input input--max" type="text"></Input>
                    </Form.Item>
                </div>

                <div className="form__input__item">
                    <p className="seacrh__input__item-title">
                        Từ ngày - Đến ngày
                    </p>
                    <Form.Item
                        name="CreatedDate"
                        style={{
                            width: "300px",
                        }}
                    >
                        <RangePicker format={dateFormat} />
                    </Form.Item>
                </div>
            </div>

            <div
                className="seacrh__input__item wrap "
                style={{ display: checkSearch ? "flex" : "none" }}
            >
                <div className="form__input__item">
                    <p className="seacrh__input__item-title">Tên công ty</p>
                    <Form.Item
                        name="Company"
                        style={{
                            width: "300px",
                        }}
                    >
                        <Input className="input input--max" type="text"></Input>
                    </Form.Item>
                </div>

                <div className="form__input__item">
                    <p className="seacrh__input__item-title">SĐT công ty</p>
                    <Form.Item
                        name="CompanyPhone"
                        style={{
                            width: "300px",
                        }}
                    >
                        <Input className="input input--max" type="text"></Input>
                    </Form.Item>
                </div>

                <div className="form__input__item">
                    <p className="seacrh__input__item-title">Bằng lái xe</p>
                    <Form.Item name="DrivingLicense">
                        <Input className="input input--max" type="text"></Input>
                    </Form.Item>
                </div>

                <div className="form__input__item">
                    <p className="seacrh__input__item-title">CMND/CCCD</p>
                    <Form.Item name="Identity">
                        <Input className="input input--max" type="text"></Input>
                    </Form.Item>
                </div>
            </div>
        </div>

        <div className="seacrh__action">
            <div className="seacrh__action-btn">
                <Button type="primary" htmlType="reset">
                    Clear
                </Button>

                <Button type="primary" htmlType="submit">
                    Tìm kiếm
                </Button>

                <Button type="primary" onClick={""}>
                    Export Excel
                </Button>

                <Button type="primary" onClick={handelCreateNewDriver}>
                    Tạo đơn mới
                </Button>

                <Checkbox className="chkSearch" onChange={onChecked}>
                    Tìm kiếm nâng cao
                </Checkbox>
            </div>
        </div>
    </Form>
}