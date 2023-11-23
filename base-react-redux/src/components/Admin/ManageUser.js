import ModalCreateUser from './Content/ModalCreateUser'

const ManageUser = (props) => {
    return (
        <div className='manage-user-container'>
            <div className='title'>
                manage user
            </div>
            <div className='users-content'>
                <div>
                    <button>Add new user</button>
                </div>
                <div>
                    Table user
                    <ModalCreateUser />
                </div>
            </div>


        </div>
    );
};

export default ManageUser;