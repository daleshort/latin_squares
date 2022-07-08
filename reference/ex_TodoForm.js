import React, {useState} from "react"; 
import InputGroup from "react-bootstrap/InputGroup"
import FormControl from "react-bootstrap/FormControl"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button";
import axios from "axios";
import TodoList from "./TodoList";


export default function TodoForm({todos, setTodos}){
   const [name, setName] = useState("");
   
    const handleChange = e => {
        setName(e.target.value);
    }

    const handleSubmit = e =>{
        e.preventDefault();
        if (!name){
            alert("please provide a valid name for todo")
            return;
        }
        
        axios.post("/api/todos/",{
        name: name
        
        }).then((res) => {
            setName("");
            const {data} = res;
            setTodos([
                ...todos,
                data
            ]).catch(()=>{
                alert("something went wrong adding");
            })
        })
    }


    return <Form onSubmit = {handleSubmit}>
        <InputGroup className = "mb-4">
            <FormControl 
            placeholder="New Todo"
            onChange={handleChange}
            value = {name} 
                        />
                <Button type="submit">
                    Add
                </Button>
        </InputGroup>
    </Form>

}
