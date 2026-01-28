import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/esm/Spinner";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { deleteUserPending } from "../../redux/user/user.slide";

const UserDeleteModal = (props: any) => {
    const { dataUser, isOpenDeleteModal, setIsOpenDeleteModal } = props;

    const dispatch = useAppDispatch();
    const isDeleting = useAppSelector((state) => state.user.isDeleting);
    const isDeleteSuccess = useAppSelector(
        (state) => state.user.isDeleteSuccess,
    );

    const handleSubmit = () => {
        dispatch(deleteUserPending({ id: dataUser?.id }));
    };

    const handleCloseModal = () => {
        setIsOpenDeleteModal(false);
    };

    useEffect(() => {
        if (isDeleteSuccess) {
            handleCloseModal();
            toast.success("Delete User Successfully");
        }
    }, [isDeleteSuccess]);

    return (
        <Modal
            show={isOpenDeleteModal}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            backdrop={false}
            onHide={() => handleCloseModal()}
        >
            {isDeleting === false ? (
                <Modal.Header closeButton>
                    <Modal.Title>Delete A User</Modal.Title>
                </Modal.Header>
            ) : (
                <Modal.Header closeButton={false}>
                    <Modal.Title>Delete A User</Modal.Title>
                </Modal.Header>
            )}

            <Modal.Body>Delete the user: {dataUser?.email ?? ""}</Modal.Body>
            {isDeleting === false ? (
                <Modal.Footer>
                    <Button
                        variant="warning"
                        onClick={() => handleCloseModal()}
                        className="mr-2"
                    >
                        Cancel
                    </Button>
                    <Button onClick={() => handleSubmit()}>Delete</Button>
                </Modal.Footer>
            ) : (
                <Button variant="primary" disabled>
                    <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />
                    &nbsp; Deleting...
                </Button>
            )}
        </Modal>
    );
};

export default UserDeleteModal;
