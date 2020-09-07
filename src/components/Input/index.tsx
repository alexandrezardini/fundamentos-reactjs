/* eslint-disable react/prop-types */
import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';
import { Container, Error, Label } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  labelName: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({
  name,
  icon: Icon,
  labelName,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFielled, setIsFielled] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFielled(!!inputRef.current?.value);
  }, []);

  const { fieldName, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container isErrored={!!error} isFocused={isFocused} isFielled={isFielled}>
      {Icon && <Icon size={20} />}
      <Label>
        <input
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          ref={inputRef}
          {...rest}
        />
        <span>{labelName}</span>
      </Label>
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Input;
