import { Card,Form,Input,Button,Table } from "antd"
// eslint-disable-next-line import/no-anonymous-default-export
export default ({formProduct},
    {handleFinishFormProduct},
    {dataInForm},
    {columnsEdit}) => {
    return <Form
        name="formProduct"
        form={formProduct}
        id="formProduct"
        autoComplete="off"
        onFinish={handleFinishFormProduct}
    >
        <Card
            title="Tạo/Sửa đơn hàng"
            className="card__edit"
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
                    <p className="form__input__item--special">Tên hàng</p>
                    <Form.Item
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên hàng',
                            },
                        ]}
                    >
                        <Input type={"text"} className="input input--edit"></Input>

                    </Form.Item>
                </div>

                <div className="form__input__item">
                    <p className="form__input__item--special">Số lượng</p>
                    <Form.Item
                        name="quantity"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập số lượng',
                            },
                        ]}
                    >
                        <Input type={"number"} className="input input--edit"></Input>
                    </Form.Item>
                </div>
            </div>

            <div className="form__input">
                <div className="form__input__item">
                    <p className="form__input__item--special">Khối lượng</p>
                    <Form.Item
                        name="weight"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập khối lượng',
                            },
                        ]}
                    >
                        <Input type={"number"} className="input input--edit"></Input>

                    </Form.Item>
                </div>

                <div className="form__input__item">
                    <p className="form__input__item--special">Trọng lượng</p>
                    <Form.Item
                        name="mass"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập trọng lượng',
                            },
                        ]}
                    >
                        <Input type={"number"} className="input input--edit"></Input>
                    </Form.Item>
                </div>
            </div>

            <div className="form__input">
                <div className="form__input__item">
                    <p className="form__input__item--special">Đơn vị tính</p>
                    <Form.Item
                        name="unit"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập đơn vị tính',
                            },
                        ]}
                    >
                        <Input type={"text"} className="input input--edit"></Input>
                    </Form.Item>
                </div>

                <div className="form__input__item">
                    <p className="form__input__item--special">Ghi chú</p>
                    <Form.Item
                        name="note"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập ghi chú',
                            },
                        ]}
                    >
                        <Input type={"text"} className="input input--edit"></Input>

                    </Form.Item>
                </div>
            </div>

            <div className="form__input">
                <div className="form__input__item">
                    <Form.Item
                        name="peopleTo"
                    >
                        <Button type="primary" htmlType="submit">
                            Thêm
                        </Button>
                    </Form.Item>
                </div>
            </div>
        </Card>

        {
            dataInForm?.length > 0 && <Table columns={columnsEdit} dataSource={dataInForm}></Table>
        }
    </Form>
}