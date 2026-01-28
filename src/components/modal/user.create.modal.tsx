import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/esm/Spinner";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { createUserPending } from "../../redux/user/user.slide";

const UserCreateModal = (props: any) => {
    const { isOpenCreateModal, setIsOpenCreateModal } = props;

    const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");

    const dispatch = useAppDispatch();
    const isCreating = useAppSelector((state) => state.user.isCreating);
    const isCreateSuccess = useAppSelector(
        (state) => state.user.isCreateSuccess,
    );

    const handleSubmit = () => {
        if (!email) {
            alert("email empty");
            return;
        }
        if (!name) {
            alert("name empty");
            return;
        }
        //call api => call redux
        dispatch(createUserPending({ name, email }));
    };

    const handleCloseModal = () => {
        setIsOpenCreateModal(false);
        setEmail("");
        setName("");
    };

    useEffect(() => {
        if (isCreateSuccess) {
            handleCloseModal();
            toast.success("Create User Successfully");
        }
    }, [isCreateSuccess]);

    return (
        <>
            <Modal
                show={isOpenCreateModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                backdrop={false}
                onHide={() => handleCloseModal()}
            >
                {isCreating === false ? (
                    <Modal.Header closeButton>
                        <Modal.Title>Add A New User</Modal.Title>
                    </Modal.Header>
                ) : (
                    <Modal.Header closeButton={false}>
                        <Modal.Title>Add A New User</Modal.Title>
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
                    {isCreating === false ? (
                        <>
                            <Button
                                variant="warning"
                                onClick={() => handleCloseModal()}
                                className="mr-2"
                            >
                                Cancel
                            </Button>
                            <Button onClick={() => handleSubmit()}>Save</Button>
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
                            &nbsp; Loading...
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default UserCreateModal;
