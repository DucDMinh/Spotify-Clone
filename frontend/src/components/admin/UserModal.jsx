import { Modal, Form, Input, Select, Button, Upload, Spin } from 'antd';
import { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';

const UserModal = ({ open, onClose, onSubmit, loading, userData }) => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        if (open) {
            // Dùng setTimeout để đẩy xuống cuối hàng đợi -> Sửa lỗi Warning đỏ
            const timer = setTimeout(() => {
                if (userData) {
                    // === CHẾ ĐỘ SỬA (EDIT) ===

                    // Tạo object ảnh chuẩn
                    const avatarFile = userData.avatar ? [{
                        uid: '-1',
                        name: 'Ảnh hiện tại',
                        status: 'done',
                        url: userData.avatar,
                    }] : [];

                    // 1. Cập nhật State hiển thị
                    setFileList(avatarFile);

                    // 2. Cập nhật giá trị cho Form 
                    form.setFieldsValue({
                        username: userData.username,
                        email: userData.email,
                        isAdmin: userData.isAdmin,
                        avatar: avatarFile, // <--- DÒNG NÀY SẼ FIX LỖI KHÔNG HIỆN ẢNH
                    });

                } else {
                    // === CHẾ ĐỘ TẠO MỚI (CREATE) ===
                    form.resetFields();
                    setFileList([]);
                }
            }, 100);

            return () => clearTimeout(timer);
        }
    }, [open, userData, form]);

    const handleReset = () => {
        form.resetFields();
        setFileList([]);
    };

    const normFile = (e) => {
        if (Array.isArray(e)) return e;
        return e?.fileList;
    };

    const handleFinish = (values) => {
        const formData = new FormData();
        formData.append('username', values.username);
        formData.append('email', values.email);
        formData.append('isAdmin', values.isAdmin);

        // Mật khẩu: Chỉ gửi nếu nhập mới
        if (values.password) {
            formData.append('password', values.password);
        }

        // Avatar: Chỉ gửi nếu là file mới upload (có originFileObj)
        if (values.avatar && values.avatar.length > 0) {
            if (values.avatar[0].originFileObj) {
                formData.append('avatar', values.avatar[0].originFileObj);
            }
        }

        onSubmit(formData);
    };

    const isEditMode = !!userData;

    return (
        <Modal
            title={<span className="text-lg font-bold text-gray-700">
                {isEditMode ? "Cập Nhật Thông Tin" : "Thêm Người Dùng Mới"}
            </span>}
            open={open}
            onCancel={onClose}
            footer={null}
            centered
            maskClosable={!loading}
            closable={!loading}
            afterClose={handleReset}
        >
            <Spin spinning={loading} tip="Đang xử lý..." size="large">
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleFinish}
                    className="mt-4"
                    initialValues={{ isAdmin: false }}
                >
                    {/* Upload Ảnh */}
                    <Form.Item label="Ảnh đại diện">
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
                        <Input placeholder="example@gmail.com" size="large" disabled={isEditMode} />
                    </Form.Item>

                    <Form.Item
                        label={isEditMode ? "Mật khẩu mới (Bỏ trống nếu không đổi)" : "Mật khẩu"}
                        name="password"
                        rules={[{ required: !isEditMode, min: 6, message: "Vui lòng nhập mật khẩu > 6 ký tự" }]}
                    >
                        <Input.Password placeholder="******" size="large" />
                    </Form.Item>

                    <Form.Item label="Vai trò" name="isAdmin">
                        <Select size="large">
                            <Select.Option value={false}>Member</Select.Option>
                            <Select.Option value={true}>Admin</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item className="mb-0 pt-4 border-t border-gray-100 flex justify-end">
                        <div className="flex justify-end gap-3">
                            <Button onClick={onClose} size="large" disabled={loading}>Hủy bỏ</Button>
                            <Button type="primary" htmlType="submit" className="bg-blue-600" size="large" loading={loading}>
                                {isEditMode ? "Lưu thay đổi" : "Tạo mới"}
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Spin>
        </Modal>
    );
};

export default UserModal;