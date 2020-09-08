/* eslint-disable no-unused-expressions */
import React, { useRef, useCallback } from 'react';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FiTag, FiEdit, FiDollarSign, FiPocket } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useToast } from '../../hooks/toast';
import { useTransaction } from '../../hooks/transactions';
import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Title, Content } from './styles';

interface Transaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

const PostTransaction: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { addToast } = useToast();
  const { postTransaction } = useTransaction();

  const handleSubmit = useCallback(
    async (data: Transaction) => {
      try {
        await postTransaction(data);
        addToast({
          type: 'success',
          title: 'Transação cadastrada',
        });
        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }
      }
    },
    [addToast, history, postTransaction],
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
