import type { FC, ReactNode } from "react";
import { App, ConfigProvider } from "antd";

type Props = {
  children: ReactNode;
};

export const AntdConfigProvider: FC<Props> = ({ children }) => (
  <ConfigProvider>
    <App
      component={false}
      notification={{
        duration: 5,
        top: 100,
        placement: "topRight",
        maxCount: 3,
      }}
    >
      {children}
    </App>
  </ConfigProvider>
);
