import { useForm, useNotify } from "react-hook-form";
import { Button } from 'react-bootstrap';

const DeleteButton = ({ confirm, id, message}) => {
    const handleClick = () => {
        if (window.confirm(message)) {
          // The code to run after confirmation
          confirm(id);

        }
      };
    
      return (
        <Button data-cy="delete" variant='danger' size="sm" onClick={handleClick}>
          delete
        </Button>
      );
    };
    export default DeleteButton