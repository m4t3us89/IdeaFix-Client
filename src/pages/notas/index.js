
import { Input, Textarea, Divider, Grid, Box, Flex, FormControl, FormErrorMessage, Button, Text , useToast  } from "@chakra-ui/react"
import { Formik, Form, Field } from 'formik';
import { useEffect, useState } from "react";
import { FaWindowClose } from 'react-icons/fa';
import notaService from "../../services/notaService";

function Nota() {
  const toast = useToast()
  const [notas, setNota] = useState([])

  useEffect(()=>{
    (async ()=>{
      await listNota()
    })()
  },[])

  async function  listNota(){
    try{
      const {data:{data:notas}} = await notaService.list()
      setNota(notas)
    }catch(err){
      showToast('Erro listar nota.' , 'Erro listar nota.' , 'error')
    }
  }

  async function removeNota(_id){
    try{
      await notaService.remove(_id)
      showToast('Nota removida com sucesso.', 'Nota removida com sucesso.' , 'warning')
      await listNota()
    }catch(err){
      showToast('Erro remover nota.' , 'Erro remover nota.' , 'error')
    }
  }

  async function onSubmit(values,actions){
    try{
      await notaService.create(values)
      actions.resetForm()
      actions.setSubmitting(false)
      showToast('Nota criada com sucesso.', 'Nota criada com sucesso.' , 'success')
      await listNota()
    }catch(err){
      showToast('Erro criar nota.' , 'Erro criar nota.' , 'error')
    }
  }

  function showToast(title,description,status){
    toast({
      title,
      description,
      status,
      position: 'top-left',
      duration: 9000,
      isClosable: true,
    })
  }

  return (
    <Flex direction={['column','column' ,'row']} h="100vh" p={[0,10]} gridGap={[0,0,5]}>

      <Box p={4} w={['100%', '100%' ,'40vw']}>
            <Box  textStyle="h2">Bloco de Notas</Box>
            <Formik
              initialValues={{ assunto: "" , texto: ""}}
              onSubmit={onSubmit}
            >
            {(props) => (
              <Form>
                    <Field name="assunto" validate={value=>(!value ? 'Assunto é obrigatório' : null)}>
                      {({ field, form }) => (
                        <FormControl isInvalid={form.errors.assunto && form.touched.assunto}>
                          <Input {...field} id="assunto" placeholder="Assunto" m={0}  bg="gray.100" />
                          <FormErrorMessage m={0}>{form.errors.assunto}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field  name="texto" validate={value=>(!value ? 'Texto é obrigatório' : null)}>
                      {({ field, form }) => (
                        <FormControl isInvalid={form.errors.texto && form.touched.texto} mt={2}>
                          <Textarea {...field} id="texto" placeholder="Texto" m={0} h="250px" bg="gray.100" />
                          <FormErrorMessage m={0}>{form.errors.texto}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Box display="flex" flexDirection="row" justifyContent="flex-end">
                    <Button
                      mt={2}
                      colorScheme="orange"
                      isLoading={props.isSubmitting}
                      type="submit">CRIAR NOTA</Button>
                    </Box>
              </Form>
            )}
          </Formik>
      </Box>
      
      <Box h='100%'>
        <Divider orientation='vertical' border={2} borderColor="orange.400" variant="solid" bg="orange.400"></Divider>
      </Box>

      <Box  p={4} w='100%' height='100%'>
        <Box textStyle="h3">Suas Notas</Box >
        <Grid templateColumns={["repeat(1, 1fr)","repeat(2, 1fr)","repeat(3, 1fr)"]} gap={10}>
        {notas && notas.map(nota=>{
          return (<Box key={nota._id} w="100%" h="150" bg="gray.100">
            <Box onClick={()=>removeNota(nota._id)} cursor="pointer" display="flex" marginTop="-5px" marginRight="-5px" flexDirection="row" justifyContent="flex-end">
              <FaWindowClose />
            </Box>
            <Box p={5}>
              <Text fontWeight="bold" color="lightseagreen">{nota.assunto}</Text>
              <Divider broder={1} mt={2} variant="dashed" bg="gray.400"></Divider>
              <Text mt={2} color="gray.400">{nota.texto}</Text>
            </Box>
            </Box>)
          })}
        </Grid>
      </Box>
      
    </Flex>
  );
}

export default Nota;
  