import { Modal, Form, Input, Select, Button, Upload } from 'antd'; // Thêm Upload
import { useState } from 'react';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons'; // Thêm Icon

const CreateUserModal = ({ open, onClose, onSubmit, loading }) => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    // Hàm chuẩn hóa dữ liệu file cho Antd Form
    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const handleFinish = (values) => {
        // === QUAN TRỌNG: CHUYỂN DỮ LIỆU SANG FORMDATA ===
        const formData = new FormData();

        // 1. Đưa các thông tin văn bản vào FormData
        formData.append('username', values.username);
        formData.append('email', values.email);
        formData.append('password', values.password);
        formData.append('isAdmin', values.isAdmin);

        // 2. Xử lý Ảnh (Logic Optional)
        // Nếu có file trong mảng fileList thì mới gửi
        if (values.avatar && values.avatar.length > 0) {
            // originFileObj là file gốc để gửi lên server
            formData.append('avatar', values.avatar[0].originFileObj);
        }
        // Nếu không có ảnh -> Không append 'avatar' -> Backend sẽ tự dùng default

        // Gửi FormData ra ngoài
        onSubmit(formData);
    };

    return (
        <Modal
            title={<span className="text-lg font-bold text-gray-700">Thêm Người Dùng Mới</span>}
            open={open}
            onCancel={onClose}
            footer={null}
            centered
            destroyOnHidden={true}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
                className="mt-4"
                initialValues={{ isAdmin: false }}
            >
                {/* === 1. Phần Upload Ảnh (Mới) === */}
                <Form.Item label="Ảnh đại diện (Tùy chọn)">
                    <Form.Item
                        name="avatar"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        noStyle
                    >
                        <Upload
                            listType="picture-card"
                            maxCount={1} // Chỉ cho chọn 1 ảnh
                            beforeUpload={() => false} // Chặn upload tự động, để gửi cùng Form
                            fileList={fileList}
                            onChange={({ fileList }) => setFileList(fileList)}
                            accept="image/*" // Chỉ nhận file ảnh
                        >
                            {fileList.length < 1 && (
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>
                    <span className="text-gray-400 text-xs">
                        Nếu không chọn, hệ thống sẽ dùng ảnh mặc định.
                    </span>
                </Form.Item>

                {/* 2. Tên đăng nhập */}
                <Form.Item
                    label="Tên đăng nhập"
                    name="username"
                    rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
                >
                    <Input placeholder="Ví dụ: tungnguyen" size="large" />
                </Form.Item>

                {/* 3. Email */}
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true }, { type: 'email' }]}
                >
                    <Input placeholder="example@gmail.com" size="large" />
                </Form.Item>

                {/* 4. Mật khẩu */}
                <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[{ required: true, min: 6 }]}
                >
                    <Input.Password placeholder="Nhập mật khẩu" size="large" />
                </Form.Item>

                {/* 5. Phân quyền */}
                <Form.Item label="Vai trò" name="isAdmin">
                    <Select size="large">
                        <Select.Option value={false}>Member</Select.Option>
                        <Select.Option value={true}>Admin</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item className="mb-0 pt-4 border-t border-gray-100 flex justify-end">
                    <div className="flex justify-end gap-3">
                        <Button onClick={onClose} size="large">Hủy bỏ</Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="bg-blue-600 hover:bg-blue-700"
                            size="large"
                            loading={loading}
                        >
                            Tạo người dùng
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateUserModal;