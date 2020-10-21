import React, { useCallback, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { IoIosAddCircleOutline } from 'react-icons/io';

import { FiEdit2, FiSearch } from 'react-icons/fi';
import api from '../../../services/api';

import { useToast } from '../../../hooks/toast';

import {
  Background,
  Container,
  SecondaryHeader,
  TableContainer,
} from './styles';

import Header from '../../../components/Header';
import Loading from '../../../components/Loading';
import AdminModal from '../../../components/Admin/Modal/AdminModal';

import { IAdminOperationsData } from '../Form/AdminForm';

export interface AdminData extends IAdminOperationsData {
  id: string;
}

const Admins: React.FC = () => {
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [toRefresh, setToRefresh] = useState(true);

  const [adminSearch, setAdminSearch] = useState('');
  const [admins, setAdmins] = useState<AdminData[]>([]);

  const [adminOpen, setAdminOpen] = useState(false);

  const [selectedAdmin, setSelectedAdmin] = useState<AdminData>(
    {} as AdminData,
  );

  const { addToast } = useToast();

  const handleSearch = useCallback(async () => {
    try {
      setLoading(true);

      await api
        .get<AdminData[]>(`admins/all?search=${adminSearch}`)
        .then(response => {
          setAdmins(response.data);

          if (!response.data.length) {
            addToast({
              type: 'info',
              title: 'Nenhum administrador encontrado',
            });
          }
        });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro na busca por administradores',
      });
    } finally {
      setLoading(false);
    }
  }, [addToast, adminSearch]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        await api.get<AdminData[]>('admins/all').then(response => {
          setAdmins(response.data);
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro na busca por administradores',
        });
      } finally {
        setLoading(false);
      }
    };

    if (toRefresh) {
      loadData();
      setToRefresh(false);
    }
  }, [addToast, toRefresh]);

  const toggleModalAdmin = useCallback(() => {
    setAdminOpen(!adminOpen);
  }, [adminOpen]);

  return (
    <>
      {loading && <Loading zIndex={1} />}

      <AdminModal
        admin={selectedAdmin}
        isOpen={adminOpen}
        setIsOpen={toggleModalAdmin}
        setToRefresh={setToRefresh}
      />

      <Header />

      <Background>
        <SecondaryHeader>
          <Link to="dashboard">
            <FontAwesomeIcon size="3x" icon={faChevronLeft} />
          </Link>
          <strong>Administradores</strong>
        </SecondaryHeader>

        <Container>
          <form>
            <strong>Pesquisar administradores</strong>
            <div>
              <input
                type="text"
                placeholder="Nome"
                value={adminSearch}
                onChange={e => setAdminSearch(e.target.value)}
              />
              <button type="button" onClick={handleSearch}>
                <FiSearch />
              </button>
            </div>
          </form>
          <div>
            <strong>Adicionar administrador</strong>

            <button type="button" onClick={() => history.push('admin-form')}>
              <IoIosAddCircleOutline />
            </button>
          </div>
          <TableContainer>
            <thead>
              <tr>
                <th>Administrador</th>
                <th>Email</th>
                <th>RA</th>
                <th>Senha</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {admins.map(admin => (
                <tr key={admin.id}>
                  <td>{admin.name}</td>
                  <td>{admin.email}</td>
                  <td>{admin.ra}</td>
                  <td>{admin.password.replace(/[^*]/g, '*')}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedAdmin(admin);
                        toggleModalAdmin();
                      }}
                    >
                      <FiEdit2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </TableContainer>
        </Container>
      </Background>
    </>
  );
};

export default Admins;
