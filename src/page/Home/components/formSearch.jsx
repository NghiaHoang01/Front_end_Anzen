import moment from "moment"
import { Input, Form, Select, Button, Checkbox, Radio, DatePicker } from "antd"

const { RangePicker } = DatePicker;
// eslint-disable-next-line import/no-anonymous-default-export
export default ({ formSearch },
    { onSearchFinish },
    { dayjs },
    { lstSelect },
    { checkboxSearch },
    { changeListSaleStaff },
    { dateFormat },
    { handelExportExcel },
    { showModalCreate },
    { onChecked },
    { isHideColumn },
    { onChangeShowAll }) => {
    return <Form
        name="basic"
        form={formSearch}
        onFinish={onSearchFinish}
        initialValues={
            {
                DateSearch: [dayjs('2022/01/01'), dayjs(moment())]
            }
        }
    >
        <div className="seacrh__input">
            <div className="seacrh__input__item">
                <div className="form__input__item">
                    <p className="seacrh__input__item-title">Mã code</p>
                    <Form.Item
                        name="Code"
                    >
                        <Input className="input input--max" type="text" ></Input>
                    </Form.Item>
                </div>

                <div className="form__input__item">
                    <p className="seacrh__input__item-title">Trạng thái đơn hàng</p>
                    <Form.Item
                        name="Status"
                        style={{
                            width: "300px"
                        }}
                    >
                        <Select
                            options={lstSelect[0].lstOption}
                            placeholder="Chọn trạng thái đơn hàng"
                        />
                    </Form.Item>
                </div>

                <div className="form__input__item">
                    <p className="seacrh__input__item-title">Hình thức thanh toán</p>
                    <Form.Item
                        name="PaymentType"
                        style={{
                            width: "300px"
                        }}
                    >
                        <Select
                            options={lstSelect[1].lstOption}
                            placeholder="Chọn hình thức thanh toán"
                        />
                    </Form.Item>
                </div>

                <div className="form__input__item">
                    <p className="seacrh__input__item-title">Đơn hàng hoàn tất</p>
                    <Form.Item
                        name="IsDone"
                        style={{
                            width: "300px"
                        }}
                    >
                        <Select
                            options={lstSelect[2].lstOption}
                            placeholder="Chọn đơn hàng hoàn tất hay chưa"
                        />
                    </Form.Item>
                </div>
            </div>

            <div className="seacrh__input__item wrap " style={{ display: checkboxSearch ? "flex" : "none" }}>
                <div className="form__input__item">
                    <p className="seacrh__input__item-title">Nhân viên kinh doanh</p>
                    <Form.Item
                        name="SaleStaff"
                        style={{
                            width: "300px"
                        }}
                    >
                        <Select
                            placeholder="Chọn nhân viên kinh doanh"
                            options={changeListSaleStaff()}
                        />
                    </Form.Item>
                </div>

                <div className="form__input__item">
                    <p className="seacrh__input__item-title">Từ ngày - Đến ngày</p>
                    <Form.Item
                        name="DateSearch"
                        style={{
                            width: "300px"
                        }}
                    >
                        <RangePicker format={dateFormat} />
                    </Form.Item>
                </div>

                <div className="form__input__item">
                    <p className="seacrh__input__item-title">Địa điểm nhận hàng</p>
                    <Form.Item
                        name="FromAddress"
                    >
                        <Input className="input input--max" type="text" ></Input>
                    </Form.Item>
                </div>

                <div className="form__input__item">
                    <p className="seacrh__input__item-title">Địa điểm Giao Hàng</p>
                    <Form.Item
                        name="ToAddress"
                    >
                        <Input className="input input--max" type="text" ></Input>
                    </Form.Item>
                </div>

                <div className="form__input__item">
                    <p className="seacrh__input__item-title">Tên khách hàng</p>
                    <Form.Item
                        name="UserName"
                    >
                        <Input className="input input--max" type="text" ></Input>
                    </Form.Item>
                </div>
            </div>
        </div>

        <div className="seacrh__action">
            <div className="seacrh__action-btn">

                <Button type="primary" htmlType="reset">Clear</Button>

                <Button type="primary" htmlType="submit">Tìm kiếm</Button>

                <Button type="primary" onClick={() => handelExportExcel()}>Export Excel</Button>

                <Button type="primary" onClick={showModalCreate} >Tạo đơn mới</Button>

                <Checkbox className="chkSearch" onChange={onChecked}>Tìm kiếm nâng cao</Checkbox>
            </div>
            <div className="seacrh__action-radio">
                <Radio.Group value={isHideColumn} onChange={onChangeShowAll}>
                    <Radio value={true}>Rút gọn</Radio>
                    <Radio value={false}>Toàn bộ cột</Radio>
                </Radio.Group>
            </div>
        </div>
    </Form>
}