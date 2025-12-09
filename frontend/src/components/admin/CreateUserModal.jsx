import { Modal, Form, Input, Select, Button, Upload, Spin } from 'antd';
import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';

const CreateUserModal = ({ open, onClose, onSubmit, loading }) => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);

    // Hàm reset toàn bộ dữ liệu khi modal đóng hẳn
    const handleReset = () => {
        form.resetFields(); // Xóa dữ liệu trong Form Input
        setFileList([]);    // Xóa dữ liệu file ảnh trong State
    };

    const normFile = (e) => {
        if (Array.isArray(e)) return e;
        return e?.fileList;
    };

    const handleFinish = (values) => {
        const formData = new FormData();
        formData.append('username', values.username);
        formData.append('email', values.email);
        formData.append('password', values.password);
        formData.append('isAdmin', values.isAdmin);
        if (values.avatar && values.avatar.length > 0) {
            formData.append('avatar', values.avatar[0].originFileObj);
        }
        onSubmit(formData);
    };

    return (
        <Modal
            title={<span className="text-lg font-bold text-gray-700">Thêm Người Dùng Mới</span>}
            open={open}
            onCancel={onClose}
            footer={null}
            centered
            maskClosable={!loading} // Khóa click ra ngoài khi đang loading
            closable={!loading} // Ẩn nút X khi đang loading

            afterClose={handleReset} // Chạy hàm này khi modal đã đóng xong
        >
            <Spin spinning={loading} tip="Đang xử lý..." size="large">
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleFinish}
                    className="mt-4"
                    initialValues={{ isAdmin: false }}
                >
                    <Form.Item label="Ảnh đại diện (Tùy chọn)">
                        <Form.Item name="avatar" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                            <Upload
                                listType="picture-card"
                                maxCount={1}
                                beforeUpload={() => false}
                                fileList={fileList}
                                onChange={({ fileList }) => setFileList(fileList)}
                                accept="image/*"
                            >
                                {fileList.length < 1 && (
                                    <div><PlusOutlined /><div style={{ marginTop: 8 }}>Upload</div></div>
                                )}
                            </Upload>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item label="Tên đăng nhập" name="username" rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}>
                        <Input placeholder="Ví dụ: tungnguyen" size="large" />
                    </Form.Item>

                    <Form.Item label="Email" name="email" rules={[{ required: true }, { type: 'email' }]}>
                        <Input placeholder="example@gmail.com" size="large" />
                    </Form.Item>

                    <Form.Item label="Mật khẩu" name="password" rules={[{ required: true, min: 6 }]}>
                        <Input.Password placeholder="Nhập mật khẩu" size="large" />
                    </Form.Item>

                    <Form.Item label="Vai trò" name="isAdmin">
                        <Select size="large">
                            <Select.Option value={false}>Member</Select.Option>
                            <Select.Option value={true}>Admin</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item className="mb-0 pt-4 border-t border-gray-100 flex justify-end">
                        <div className="flex justify-end gap-3">
                            <Button onClick={onClose} size="large" disabled={loading}>
                                Hủy bỏ
                            </Button>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="bg-blue-600 hover:bg-blue-700"
                                size="large"
                                loading={loading} // Nút cũng xoay
                            >
                                Tạo người dùng
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Spin>
        </Modal>
    );
};

export default CreateUserModal;