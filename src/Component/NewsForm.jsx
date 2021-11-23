import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import * as Yup from 'yup';
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { Button, Form } from 'react-bootstrap'
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import sendRequest from '../httpClient';
import { Upload } from './AWS';
import Loader from './Loader';

const loadComponent = (news) => {
  if (news) {
    return {
      textButton: 'Guardar cambios',
      name: news.name,
      content: news.content,
      image: news.image,
      categoryId: news.categoryId,
      id: news.id,
    }
  }
  return {
    textButton: 'Crear novedad',
    name: '',
    content: '',
    image: '',
    categoryId: '',
  }
}

const NewsForm = ({ news }) => {
  const [config] = useState(loadComponent(news))
  const [action] = useState(news ? 'put' : 'post')
  const [img, setImg] = useState(config.image)
  const [isLoading, setIsLoading] = useState(true)
  const [isSavingData, setIsSavingData] = useState(false)
  const [categories, setCategories] = useState([])
  const [blurredEditor, setblurredEditor] = useState(false)
  const fileInput = useRef()

  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data } = await sendRequest('GET', '/categories', null)
        setCategories(data)
      } catch (e) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrio un error obteniendo la informacion, intenta nuevamente.',
        })
      } finally {
        setIsLoading(false)
      }
    }
    getCategories()
  }, [])

  const formik = useFormik({
    initialValues: {
      name: config.name,
      content: config.content,
      image: config.image,
      categoryId: config.categoryId,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('El Nombre es requerido').max(200, 'Maximo 200 caracteres'),
      content: Yup.string().required('El contenido es requerido'),
      image: Yup.string().required('Una imagen es requerida'),
    }),
    onSubmit: async (values) => {
      if (
        !formik.errors.content && !formik.errors.name && !formik.errors.image
        && formik.values.content.length > 0 && formik.values.name.length > 0
        && formik.values.image.length > 0
      ) {
        try {
          setIsSavingData(true)
          const body = values
          if (values.image !== config.image) {
            const [file] = fileInput.current.files
            const { location } = await Upload(file, file.name)
            body.image = location
          }
          const relativeUrl = action === 'post' ? '/news' : `/news/${config.id}`
          if (action === 'put') body.id = config.id
          await sendRequest(action, relativeUrl, body)
          Swal.fire({
            icon: 'success',
            title: 'Cambios guardados',
          })
        } catch (e) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `Ocurrio un error ${action === 'post' ? 'creando' : 'actualizando'} la novedad, intenta nuevamente.`,
          })
        } finally {
          setIsSavingData(false)
        }
      }
    },
  })
  const changeImg = (e) => {
    const imgUrl = URL.createObjectURL(e.target.files[0])
    setImg(imgUrl)
  }

  return (
    <>
      <Loader visible={isLoading} />
      <Form onSubmit={formik.handleSubmit}>
        <Form.Label htmlFor="name">Nombre</Form.Label>
        <Form.Control
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          className="mb-4"
        />
        <Form.Label className="d-block" style={{ color: 'red' }}>
          {formik.errors.name}
        </Form.Label>
        <Form.Label htmlFor="content">Contenido</Form.Label>
        <CKEditor
          config={{ placeholder: 'Ingrese el contenido de la novedad' }}
          editor={ClassicEditor}
          onBlur={() => { setblurredEditor(true) }}
          data={formik.values.content}
          onChange={(event, editor) => {
            formik.setFieldValue('content', editor.getData(), true)
          }}
        />
        <Form.Label className="d-block" visuallyHidden={!blurredEditor} style={{ color: 'red' }}>
          {formik.errors.content}
        </Form.Label>
        <Form.Label className="mt-4">Subir imagen</Form.Label>
        <Form.Control
          type="file"
          name="image"
          onChange={(e) => {
            formik.handleChange(e)
            changeImg(e)
          }}
          ref={fileInput}
          onBlur={formik.handleBlur}
          className="mb-4"
        />
        <Form.Label className="d-block" style={{ color: 'red' }}>
          {formik.errors.image}
        </Form.Label>
        {img && <img src={img} style={{ maxWidth: '450px', display: 'block' }} alt="" />}
        <Form.Label>Categoria</Form.Label>
        <Form.Select
          aria-label="Default select example"
          name="categoryId"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.categoryId}
          className="mb-4"
        >
          <option disabled>Seleccione</option>
          { categories.map(({ name, id }) => <option key={id} value={id}>{name}</option>)}
        </Form.Select>
        <Button
          disabled={
            formik.errors.name || formik.errors.content || formik.errors.image || isSavingData
          }
          className="d-block w-50 mx-auto"
          type="submit"
        >
          {isSavingData ? 'Guardando...' : config.textButton}
        </Button>
      </Form>
    </>
  )
}

NewsForm.defaultProps = {
  news: null,
}

NewsForm.propTypes = {
  news: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    categoryId: PropTypes.number.isRequired,
  }),
}

export default NewsForm
