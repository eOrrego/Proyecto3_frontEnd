import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import Swal from 'sweetalert2';
import { createUsers, updateUser } from '../services/userService';

const FormCreateUser = ({
    setCreateUser,
    usuarios,
    setUsuarios,
    setUsuariosSearch,
    isEdit,
    usuario,
    isEditLoading,
    userId,
}) => {
    const [newUser, setNewUser] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setNewUser({ ...newUser, [e.target.id]: e.target.value });
    };

    useEffect(() => {
        setIsLoading(true);
        setNewUser(usuario);
        setIsLoading(false);
    }, [usuario]);

    const crearUsuario = async () => {
        setIsLoading(true);
        const { data } = await createUsers({ ...newUser});
        setNewUser({});
        Swal.fire(
            'Usuario creado!',
            'Presiona ok para continuar',
            'success'
        )
        const allUsers = [...usuarios, data];
        setUsuarios(allUsers);
        setUsuariosSearch(allUsers);
        setIsLoading(false);
        setCreateUser(false);
    };

    const editUser = async () => {
        setIsLoading(true);
        await updateUser(userId, newUser);
        setIsLoading(false);
        Swal.fire(
            'Usuario editado!',
            'Presiona ok para continuar',
            'success'
        )
        navigate('/admin/edit/user');
    };

    return (
        <div>
            <h1>{isEdit ? 'Editar Usuario' : 'Agregar Usuario'}</h1>
            <Loader isLoading={isLoading || isEditLoading}>
                <Form>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            value={newUser?.name}
                            onChange={(e) => handleChange(e)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            value={newUser?.email}
                            onChange={(e) => handleChange(e)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            value={newUser?.password}
                            onChange={(e) => handleChange(e)}
                        />
                    </Form.Group>
                    {isEdit ?
                        (<>
                            <Button className='my-3 btn-block' variant="warning" type="button" onClick={editUser}>
                                Editar
                            </Button>
                            <Button className='my-3 btn-block' variant="danger" type="button" onClick={() => navigate('/admin/edit/user')}>
                                Cancelar
                            </Button>
                        </>)
                        :
                        (<Button className='my-3 btn-block' variant="success" type="button" onClick={crearUsuario}>
                            Agregar
                        </Button>)}
                </Form>
            </Loader>
        </div>
    );
};

export default FormCreateUser;