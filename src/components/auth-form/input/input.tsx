function Input({ handleChange, input }) {
  const { type, name, id, placeholder } = input;
  return (
    <label className="auth-form__input">
      <input
        type={type}
        name={name}
        id={id}
        className="auth-form__field"
        placeholder={placeholder}
        required
        onChange={handleChange}
      />
    </label>
  );
}
export default Input;
