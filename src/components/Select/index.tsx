/* eslint-disable react/prop-types */
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  SelectHTMLAttributes,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';
import { Container, Error } from './styles';

interface SelectProps extends SelectHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Select: React.FC<SelectProps> = ({ name, icon: Icon, ...rest }) => {
  const selectRef = useRef<HTMLSelectElement>(null);

  const [isFielled, setIsFielled] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFielled(!!selectRef.current?.value);
  }, []);

  const { fieldName, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);
  return (
    <Container isErrored={!!error} isFocused={isFocused} isFielled={isFielled}>
      {Icon && <Icon size={20} />}

      <select onFocus={handleInputFocus} onBlur={handleInputBlur}>
        <option value="imcome">Entrada</option>
        <option value="outcome">Saída</option>
      </select>
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Select;
