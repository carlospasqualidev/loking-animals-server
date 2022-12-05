/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-console */
// LIBS
import { View, StyleSheet, ScrollView } from 'react-native';

import { useEffect, useState } from 'react';

// COMPONENTS
import { Text, Card, LoadingScreen, CardInfoRow, CardInfo } from '../../components';
import { sizes, useTheme } from '../../styles';
import { requestAnimalsData, requestAnimalsList } from './functions';
import { IAnimalsList, IDashboard } from './types';

export const Dashboard = () => {
  const [animalDashboard, setAnimalDashboard] = useState<IDashboard | null>(null);
  const [animalList, setAnimalList] = useState<IAnimalsList[] | null>(null);
  const [callFunctions, setCallFunctions] = useState(0);

  const theme = useTheme();

  // #region STYLES
  const styles = StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: sizes['sm-16'],
      alignItems: 'center',
    },

    smallCards: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    scrollView: {
      height: 350,
    },
    spacer: {
      width: '100%',
      minHeight: 2,
      backgroundColor: theme.colors.background,
      marginVertical: sizes['sm-4'],
    },
  });
  // #endregion

  useEffect(() => {
    requestAnimalsData({ setState: setAnimalDashboard });
    requestAnimalsList({ setState: setAnimalList });

    setTimeout(() => setCallFunctions(callFunctions + 1), 1000);
  }, [callFunctions]);

  return (
    <LoadingScreen isLoading={!animalDashboard}>
      <View style={styles.background}>
        {animalDashboard && (
          <>
            <Card>
              <View>
                <View style={{ width: '100%', alignItems: 'center' }}>
                  <Text type="h6">Animais</Text>
                </View>

                <View style={styles.spacer} />

                <View style={styles.smallCards}>
                  <CardInfo
                    label="Total"
                    value={animalDashboard!.AnimalsTotal}
                    icon="cow"
                  />
                  <CardInfo
                    label="Peso"
                    value={animalDashboard!.AnimalWeightAVG}
                    icon="scale-unbalanced"
                  />
                  <CardInfo label="Idade" value={343} icon="baby-carriage" />
                </View>

                <ScrollView style={styles.scrollView}>
                  {animalList!.map((animal, i: number) => (
                    <CardInfoRow
                      // eslint-disable-next-line react/no-array-index-key
                      key={i}
                      icon="cow"
                      gender={animal.Gender}
                      breed={animal.Breed}
                      weight={animal.weight}
                    />
                  ))}
                </ScrollView>
              </View>
            </Card>

            <Card>
              <View>
                <View style={{ width: '100%', alignItems: 'center' }}>
                  <Text type="h6">Animais p/ local</Text>
                </View>

                <View style={styles.spacer} />

                <View style={styles.smallCards}>
                  <CardInfo
                    label="Pasto"
                    value={animalDashboard!.AnimalsPerLocal.Pasture}
                    icon="cow"
                  />
                  <CardInfo
                    label="Comida"
                    value={animalDashboard!.AnimalsPerLocal.Food}
                    icon="scale-unbalanced"
                  />
                  <CardInfo
                    label="Vacina"
                    value={animalDashboard!.AnimalsPerLocal.Vaccine}
                    icon="needle"
                  />
                </View>
              </View>
            </Card>
          </>
        )}
      </View>
    </LoadingScreen>
  );
};
