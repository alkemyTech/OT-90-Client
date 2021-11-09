import * as Yup from 'yup';

import React, { useState } from 'react'

import ButtonComponent from './Button'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { Form } from 'react-bootstrap'
import { useFormik } from 'formik';

const loadComponent = (news) => {
  if (news) {
    return {
      textButton: 'Editar',
      name: news.name,
      content: news.content,
      image: news.image,
      categoryId: news.categoryId
}}
    return {
      textButton: 'Crear',
      name: '',
      content: '',
      image: '',
      categoryId: ''
}}

const categories = [
  {
    categoryId: 1,
    name: "Taller"
  }, 
  {
    categoryId: 2,
  name: "Paseos"
  }]

const NewsForm = (props) => {
  const { news } = props
  const [config] = useState(loadComponent(news))
  const [action] = useState(news ? 'put' : 'post')
  const [isLoading, setIsLoading] = useState(false)
  const [blurredEditor, setblurredEditor] = useState(false)
  
  const threadSleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

  const formik = useFormik({
    initialValues:{
        name: config.name,
        content: config.content,
        image: config.image,
        categoryId: config.categoryId
    },
    validationSchema: Yup.object({
        name: Yup.string().required('Nombre en un campo obligatorio').max(200, 'Campo nombre max 200 caracteres'),
        content: Yup.string().required('Contenido en un campo obligatorio')
    }),
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    }
})

  const onSubmit = async (news, actionn) => {
    if ( 
        !formik.errors.content && !formik.errors.name && 
        formik.values.content.length > 0 && formik.values.name.length > 0
        )
    {
      setIsLoading(true)
      await threadSleep(1000)
      setIsLoading(false)
      if (action === 'post') {
      // eslint-disable-next-line no-console
      console.log(`Accion: ${actionn}`)
      // eslint-disable-next-line no-console
      console.log(news)
      } else if (action === 'put') {
      // eslint-disable-next-line no-console
      console.log(`Accion: ${actionn}`)
      // eslint-disable-next-line no-console
      console.log(news) }
    }
  }

return (
  <Form onSubmit={formik.handleSubmit}>
      
    <Form.Label htmlFor="name">Nombre</Form.Label>
      <Form.Control
        id="name"
        name="name"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.name}
      />
    <Form.Label style={{ color: 'red' }}>
      {formik.errors.name}
    </Form.Label>
    <div></div>
    
    <Form.Label htmlFor="content">Contenido</Form.Label>
      <CKEditor
        config={{ placeholder: 'Ingrese el contenido de la novedad' }}
        editor={ClassicEditor}
        onBlur={() => {setblurredEditor(true)}}
        data={formik.values.content}
        onChange={(event, editor) => {
                formik.setFieldValue('content', editor.getData(), true)
        }}
      />
      <Form.Label visuallyHidden={!blurredEditor} style={{ color: 'red' }}>
        {formik.errors.content}
    </Form.Label>
    
    <Form.Label>Subir imagen</Form.Label>
    <Form.Control type="file" name="image" 
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.image}/>
        
    <Form.Label>Categoria</Form.Label>
    <Form.Select aria-label="Default select example"
      name="categoryId"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.categoryId}>
        <option>Seleccione</option>
        { categories.map((category, i )=> {
            return <option key={i} value={category.categoryId}>
              {category.name}</option>
      })}        
    </Form.Select>

    <ButtonComponent
      variant="primary"
      title={config.textButton}
      onClick=
        { 
          async () => onSubmit(
            news ? {
              id: news.id, name: formik.values.name, content: formik.values.content, 
              image: formik.values.image, categoryId: formik.values.categoryId
              } : {
              name: formik.values.name, content: formik.values.content, 
              image: formik.values.image, categoryId: formik.values.categoryId
              }, action,)
        }
            isLoading={isLoading}
            disabled={formik.errors.name || formik.errors.content}
    />
    
    </Form>
)
}

export default NewsForm