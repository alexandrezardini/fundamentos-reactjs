import React from 'react';

import { Link } from 'react-router-dom';

import { Container } from './styles';

import Logo from '../../assets/logo.svg';

interface HeaderProps {
  size?: 'small' | 'large';
}

const Header: React.FC<HeaderProps> = ({ size = 'large' }: HeaderProps) => (
  <Container size={size}>
    <header>
      <Link to="/">
        <img src={Logo} alt="GoFinances" />
      </Link>
      <nav>
        <Link to="/">
          <strong>Listagem</strong>
        </Link>

        <Link to="/post">
          <strong>Cadastrar</strong>
        </Link>

        <Link to="/import">
          <strong>Importar</strong>
        </Link>
      </nav>
    </header>
  </Container>
);

export default Header;
