import Link from "next/link";
import { Button, Col, Form, Row } from "react-bootstrap";
import InputPassword from "../components/fields/InputPassword";
import InputText from "../components/fields/InputText";
import GuestLayout from "../components/layouts/guestLayout";
import { PageWithLayout } from "../lib/layoutTypes";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { LoginForm, loginValidator } from "../utils/validator";
import { except } from "../utils/helper";
import axios from "../lib/axios";
import { API_AUTH } from "../utils/api-urls";
import { AxiosAuthRefreshRequestConfig } from "axios-auth-refresh";
import { EXCEPTION_MESSAGES } from "../utils/exception-messages";
import { useRouter } from "next/router";
import PageTitle from "../components/page-title";
import { useState } from "react";
import useAuth from "../lib/hooks/useAuth";

const Login: PageWithLayout = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { setAuth } = useAuth() as any;
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginValidator),
    mode: "onChange",
  });
  const router = useRouter();
  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    const { email, password } = data;
    try {
      const response = await axios.post(
        `${API_AUTH}/login`,
        {
          email,
          password,
        },
        { skipAuthRefresh: true } as AxiosAuthRefreshRequestConfig
      );
      const { accessToken, refreshToken, user } = response.data;
      setAuth({ accessToken, refreshToken, user });
      router.push("/movies");
    } catch (error: any) {
      let message = error?.message;
      if (error.code == "ERR_BAD_REQUEST" || error.response.status == 404) {
        message = EXCEPTION_MESSAGES.LOGIN_ERROR;
      } /*
          dispatchToast({
            show: true,
            message: message || 'エラーが発生しました',
            variant: 'danger',
          })*/
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageTitle title="MMDB Login" showHorizontalBar />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col xs={12}>
            <InputText
              htmlId="email"
              name="email"
              labelText="Email"
              placeholder="your_mail@mmdb.com"
              isInvalid={errors.email?.message ? true : false}
              isValid={
                dirtyFields.email && !errors.email?.message ? true : false
              }
              errorMessage={errors.email?.message}
              {...except(register("email"), ["ref"])}
              inputRef={register("email").ref}
            />
          </Col>
          <Col xs={12}>
            <InputPassword
              htmlId="password"
              name="password"
              formGroupClassName="my-3"
              labelText="Password"
              placeholder="Password"
              validated={dirtyFields.password}
              isInvalid={errors.password?.message ? true : false}
              errorMessage={errors.password?.message}
              {...except(register("password"), ["ref"])}
              inputRef={register("password").ref}
            />
          </Col>
          <Col xs={12}>
            <Button
              type="submit"
              variant="primary"
              className="w-100 fw-bold"
              disabled={loading}
            >
              Login
            </Button>
          </Col>
          <Col xs={12}>
            <div className="pt-2 text-primary fw-bold text-center">
              <Link href={"/register"}>
                <a>Sign Up</a>
              </Link>
            </div>
          </Col>
        </Row>
      </Form>
    </>
  );
};

Login.isPublicPage = true;
Login.getPageLayout = function getPageLayout(page) {
  return <GuestLayout>{page}</GuestLayout>;
};
export default Login;
