import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/esm/Spinner";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { editUserPending } from "../../redux/user/user.slide";

const UserEditModal = (props: any) => {
    const { isOpenUpdateModal, setIsOpenUpdateModal, dataUser, setDataUser } =
        props;
    const [id, setId] = useState();

    const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");

    const dispatch = useAppDispatch();
    const isEditing = useAppSelector((state) => state.user.isEditing);
    const isEditSuccess = useAppSelector((state) => state.user.isEditSuccess);

    useEffect(() => {
        if (dataUser?.id) {
            setId(dataUser?.id);
            setEmail(dataUser?.email);
            setName(dataUser?.name);
        }
    }, [dataUser]);

    useEffect(() => {
        if (isEditSuccess) {
            handleCloseModal();
            toast.success("Edit User Successfully");
        }
    }, [isEditSuccess]);

    const handleSubmit = () => {
        if (!email) {
            alert("email empty");
            return;
        }
        if (!name) {
            alert("name empty");
            return;
        }
        dispatch(
            editUserPending({
                id: id,
                name,
                email,
            }),
        );
    };

    const handleCloseModal = () => {
        setIsOpenUpdateModal(false);
        setEmail("");
        setName("");
        setId(undefined);
        setDataUser(null);
    };

    return (
        <>
            <Modal
                show={isOpenUpdateModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                backdrop={false}
                onHide={() => handleCloseModal()}
            >
                {isEditing === false ? (
                    <Modal.Header closeButton>
                        <Modal.Title>Update A User</Modal.Title>
                    </Modal.Header>
                ) : (
                    <Modal.Header closeButton={false}>
                        <Modal.Title>Update A User</Modal.Title>
                    </Modal.Header>
                )}

                <Modal.Body>
                    <FloatingLabel label="Email" className="mb-3">
                        <Form.Control
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                        />
                    </FloatingLabel>
                    <FloatingLabel label="Name">
                        <Form.Control
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                        />
                    </FloatingLabel>
                </Modal.Body>
                <Modal.Footer>
                    {isEditing === false ? (
                        <>
                            <Button
                                variant="warning"
                                onClick={() => handleCloseModal()}
                                className="mr-2"
                            >
                                Cancel
                            </Button>
                            <Button onClick={() => handleSubmit()}>Edit</Button>
                        </>
                    ) : (
                        <Button variant="primary" disabled>
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                            &nbsp; Editting...
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default UserEditModal;
