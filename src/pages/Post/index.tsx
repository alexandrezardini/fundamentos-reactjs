import React, { useRef, useCallback } from 'react';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FiTag, FiEdit, FiDollarSign, FiPocket } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Title, Content } from './styles';

interface TransactionFormData {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

const PostTransaction: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: TransactionFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          title: Yup.string().required('Título obrigatório'),
          value: Yup.number().required('E-mail obrigatório'),
          type: Yup.string().required('E-mail obrigatório'),
          categoryTitle: Yup.string().required('Categoria Obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('transactions', data);

        history.push('/');

        addToast({
          type: 'success',
          title: 'Trasação cadastrada!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro durante o cadastro, tente novamente',
        });
      }
    },
    [addToast, history],
  );

  return (
    <>
      <Header size="small" />
      <Container>
        <Title>Cadastrar transação</Title>
        <Content>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input labelName="Título" name="title" icon={FiEdit} />
            <Input
              labelName="Valor"
              name="value"
              icon={FiDollarSign}
              type="number"
            />
            <Input labelName="Tipo" name="type" icon={FiPocket} />
            <Input labelName="Categoria" name="categoryTitle" icon={FiTag} />
            <Button type="submit">Cadastrar</Button>
          </Form>
        </Content>
      </Container>
    </>
  );
};

export default PostTransaction;
