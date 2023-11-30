import ModalCreateUser from './Content/ModalCreateUser'
import './Content/ManageUser.scss'
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

                </div>
                <ModalCreateUser />
            </div>


        </div>
    );
};

export default ManageUser;