import { type FC, memo, useState } from "react";
import { Clusterer, Map, Placemark, YMaps } from "@pbe/react-yandex-maps";
import { Drawer, Flex, Typography } from "antd";

type PlainObject = Record<string, any>;

const ObjectsMap: FC<{ onItemClick: (item: any) => void }> = memo(
  ({ onItemClick }) => {
    const mock = [
      { geo: [56.034, 36.992], title: "Объект 1", cost: 2000 },
      { geo: [56.034, 36.982], title: "Объект 2", cost: 2300 },
      { geo: [55.75, 37.57], title: "Объект 3", cost: 2400 },
      { geo: [55.75, 37.37], title: "Объект 4", cost: 2400 },
      { geo: [55.75, 37.47], title: "Объект 5", cost: 2600 },
      { geo: [55.35, 37.47], title: "Объект 6", cost: 2700 },
    ] as const;

    return (
      <YMaps>
        <Map
          height={800}
          width="100%"
          defaultState={{ center: [55.75, 37.57], zoom: 10.8 }}
          modules={["geoObject.addon.balloon", "geoObject.addon.hint"]}
        >
          <Clusterer
            options={{
              preset: "islands#invertedBlueClusterIcons",
              groupByCoordinates: false,
            }}
          >
            {mock.map((coordinates, index) => (
              <Placemark
                key={index}
                geometry={coordinates.geo}
                instanceRef={(inst) => {
                  if (inst) {
                    inst.events?.add("click", () => onItemClick(coordinates));
                  }
                }}
                options={{
                  preset: "islands#blueCircleDotIcon",
                }}
              />
            ))}
          </Clusterer>
        </Map>
      </YMaps>
    );
  },
);

export const Main: FC = () => {
  const [info, setInfo] = useState<PlainObject | null>(null);

  return (
    <Flex gap="middle" vertical>
      <Typography.Title level={3}>Главная</Typography.Title>
      <ObjectsMap onItemClick={setInfo} />
      <Drawer
        placement="left"
        open={info !== null}
        onClose={() => setInfo(null)}
      >
        <Typography.Title level={4}> Подробная информация</Typography.Title>
        <div>Название: {info?.title || "-"}</div>
        <div>Стоимость: {info?.cost || "-"}</div>
      </Drawer>
    </Flex>
  );
};

ObjectsMap.displayName = "ObjectsMap";
