import { useRouter } from "next/router"
import { useRef } from "react"
import { useForm } from "react-hook-form"
import { PageWithLayout } from "../lib/layoutTypes"
import { RegistrationForm, registrationValidator } from "../utils/validator";
import { yupResolver } from "@hookform/resolvers/yup";
import PageTitle from "../components/page-title";
import { Form, Row, Col, Button, } from "react-bootstrap";
import InputText from "../components/fields/InputText";
import { except } from "../utils/helper";
import InputPassword from "../components/fields/InputPassword";
import Link from "next/link";
import GuestLayout from "../components/layouts/guestLayout";
import { API_USER } from "../utils/api-urls";
import axios from "../lib/axios";
import { EXCEPTION_MESSAGES } from "../utils/exception-messages";

const Register: PageWithLayout = () => {
    const router = useRouter()
    const formRef = useRef(null)
    const onSubmit = async (data: RegistrationForm) => {
        try {
            await axios.post(`${API_USER}/register`, data)
            router.push("/home");
          } catch (error: any) {
            // EXCEPTION_MESSAGES.SOMETHING_WENT_WRONG
          }
      }
    const {
        register,
        handleSubmit,
        formState: { errors, dirtyFields },
      } = useForm<RegistrationForm>({
        mode: 'onChange',
        resolver: yupResolver(registrationValidator),
      })
    return <>
      <PageTitle title="Register" />
      <Form onSubmit={handleSubmit(onSubmit)} ref={formRef}>

      <Row>
          <Col xs={12}>
            <InputText
              htmlId="name"
              name="name"
              labelText="Name"
              placeholder="Name"
              isInvalid={errors.name?.message ? true : false}
              isValid={dirtyFields.name && !errors.name?.message ? true : false}
              errorMessage={errors.name?.message}
              {...except(register('name'), ['ref'])}
              inputRef={register('name').ref}
            />
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <InputText
              htmlId="email"
              name="Email"
              labelText="Email"
              placeholder="your_mail@mmdb.com"
              isValid={
                dirtyFields.email && !errors.email?.message ? true : false
              }
              isInvalid={errors.email?.message ? true : false}
              errorMessage={errors.email?.message}
              {...except(register('email'), ['ref'])}
              inputRef={register('email').ref}
            />
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <InputPassword
              htmlId="password"
              name="password"
              labelText="Password"
              placeholder="Password"
              text={errors.password?.message ? '' : 'Password should be 8-20 characters long and must me alphanumeric'}
              validated={dirtyFields.password}
              isInvalid={errors.password?.message ? true : false}
              errorMessage={errors.password?.message}
              {...except(register('password'), ['ref'])}
              inputRef={register('password').ref}
            />
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <InputPassword
              htmlId="confirmedPassword"
              name="confirmedPassword"
              labelText="Retype password"
              placeholder="Retyped password"
              validated={dirtyFields.confirmPassword}
              isInvalid={errors.confirmPassword?.message ? true : false}
              errorMessage={errors.confirmPassword?.message}
              {...except(register('confirmPassword'), ['ref'])}
              inputRef={register('confirmPassword').ref}
            />
          </Col>
        </Row>

        <Row className="mt-2">
        <Col xs={12}>
            <Button type="submit" variant="primary" className="w-100 fw-bold">
              Register
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="text-primary fw-bold text-center pt-2">
              <Link href={'/login'}>
                <a>Login</a>
              </Link>
            </div>
          </Col>
        </Row>
      </Form>
    </>
}
Register.isPublicPage = true
Register.getPageLayout = function getPageLayout(page) {
    return <GuestLayout>{page}</GuestLayout>;
  };
export default Register 