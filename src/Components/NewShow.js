import { useForm, Controller } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import React, { Component,useEffect,useState,useContext } from 'react';
import { ShowContext } from './Context/ShowContext';

function NewShowForm(props) {
    const { register, handleSubmit, reset, control, setValue } = useForm();
    const { user, isAuthenticated, isLoading } = useAuth0();
    const { Reload } = props;
    const navigate = useNavigate();
    const { fetchShows } = useContext(ShowContext);
    const Api = process.env.REACT_APP_API_PATH

    const onSubmit = async (data) => {
      //try {

      try {
        // Perform POST request
        const response = await fetch(Api+'/Show', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ show_name: data.showName, show_discription: data.showDiscription, show_language: data.showLanguage, auth_sub: user.sub}),
        });
        
        if (!response.ok) {
          console.error('Failed to upload new show');
          
        }
        
      } catch (error) {
        console.error('Error:', error);
      }
      fetchShows();
      if(Reload!=null){
      Reload();
      }else{
        navigate('/shows')
      }
    };
    
  
    return (
      <Form className='m-3' onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="showName">
          <Form.Label>Show name</Form.Label>
          <Form.Control type="text" name="showName" {...register("showName", {required: "Required", })} placeholder="Enter the show name" />
        </Form.Group>
  
        <Form.Group controlId="showDiscription">
          <Form.Label>discription</Form.Label>
          <Form.Control type="text" name="showDiscription" {...register("showDiscription", {required: "Required", })} placeholder="discription of the show"/>
        </Form.Group>
  
        <Form.Group controlId="showLanguage">
          <Form.Label>Language</Form.Label>
          <Form.Control as="select" name="showLanguage" {...register("showLanguage", { required: "Required" })}>
            <option value="">Select a language...</option>
            <option value="English">English</option>
            <option value="Dutch">Dutch</option>
            <option value="Afrikaans">Afrikaans</option>
            <option value="Arabic">Arabic</option>
            <option value="Bengali">Bengali</option>
            <option value="Bulgarian">Bulgarian</option>
            <option value="Catalan">Catalan</option>
            <option value="Cantonese">Cantonese</option>
            <option value="Croatian">Croatian</option>
            <option value="Czech">Czech</option>
            <option value="Danish">Danish</option>
            <option value="Lithuanian">Lithuanian</option>
            <option value="Malay">Malay</option>
            <option value="Malayalam">Malayalam</option>
            <option value="Panjabi">Panjabi</option>
            <option value="Tamil">Tamil</option>
            <option value="Finnish">Finnish</option>
            <option value="French">French</option>
            <option value="German">German</option>
            <option value="Greek">Greek</option>
            <option value="Hebrew">Hebrew</option>
            <option value="Hindi">Hindi</option>
            <option value="Hungarian">Hungarian</option>
            <option value="Indonesian">Indonesian</option>
            <option value="Italian">Italian</option>
            <option value="Japanese">Japanese</option>
            <option value="Javanese">Javanese</option>
            <option value="Korean">Korean</option>
            <option value="Norwegian">Norwegian</option>
            <option value="Polish">Polish</option>
            <option value="Portuguese">Portuguese</option>
            <option value="Romanian">Romanian</option>
            <option value="Russian">Russian</option>
            <option value="Serbian">Serbian</option>
            <option value="Slovak">Slovak</option>
            <option value="Slovene">Slovene</option>
            <option value="Spanish">Spanish</option>
            <option value="Swedish">Swedish</option>
            <option value="Telugu">Telugu</option>
            <option value="Thai">Thai</option>
            <option value="Turkish">Turkish</option>
            <option value="Ukrainian">Ukrainian</option>
            <option value="Vietnamese">Vietnamese</option>
            <option value="Welsh">Welsh</option>
            <option value="Sign language">Sign language</option>
            <option value="Algerian">Algerian</option>
            <option value="Aramaic">Aramaic</option>
            <option value="Armenian">Armenian</option>
            <option value="Berber">Berber</option>
            <option value="Burmese">Burmese</option>
            <option value="Bosnian">Bosnian</option>
            <option value="Brazilian">Brazilian</option>
            <option value="Bulgarian">Bulgarian</option>
            <option value="Cypriot">Cypriot</option>
            <option value="Corsica">Corsica</option>
            <option value="Creole">Creole</option>
            <option value="Scottish">Scottish</option>
            <option value="Egyptian">Egyptian</option>
            <option value="Esperanto">Esperanto</option>
            <option value="Estonian">Estonian</option>
            <option value="Finn">Finn</option>
            <option value="Flemish">Flemish</option>
            <option value="Georgian">Georgian</option>
            <option value="Hawaiian">Hawaiian</option>
            <option value="Indonesian">Indonesian</option>
            <option value="Inuit">Inuit</option>
            <option value="Irish">Irish</option>
            <option value="Icelandic">Icelandic</option>
            <option value="Latin">Latin</option>
            <option value="Mandarin">Mandarin</option>
            <option value="Nepalese">Nepalese</option>
            <option value="Sanskrit">Sanskrit</option>
            <option value="Tagalog">Tagalog</option>
            <option value="Tahitian">Tahitian</option>
            <option value="Tibetan">Tibetan</option>
            <option value="Gypsy">Gypsy</option>
            <option value="Wu">Wu</option>
          </Form.Control> 
        </Form.Group>


        <Button variant="primary" type="submit" className='mt-2'>
          Submit
        </Button>
      </Form>
    );
  };

  export default NewShowForm