import {Formik} from 'formik';
import {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox/build/dist/BouncyCheckbox';
//formvalidation
import * as Yup from 'yup';

const Formvalidation = Yup.object().shape({
  passwordlength: Yup.number()
    .min(4, 'it should be minimum of 4 letters')
    .max(12, 'max of 12 characters')
    .required('this is required'),
});

const App = () => {
  const [password, setPassword] = useState('');
  const [isPasswordGenerated, setisPasswordGenerated] = useState(false);
  const [lowerCase, lowerCaseSet] = useState(true);
  const [upperCase, upperCaseSet] = useState(false);
  const [symbol, symbolSet] = useState(false);
  const [number, useNumber] = useState(false);

  const generatePasswordString = (passwordlength: number) => {
    let CharacterList = '';

    const UpperCaseList = 'ASDFGHJKLMNBVCXZQWERTYUIOP';
    const lowerCaseList = 'asdfghjklmnbvcxzqwertyuiop';
    const numbersList = '0123456789';

    if (upperCase) {
      CharacterList += UpperCaseList;
    }
    if (lowerCase) {
      CharacterList += lowerCaseList;
    }
    if (number) {
      CharacterList += number;
    }

    const passwordfinal = createPassword(CharacterList, passwordlength);

    setPassword(passwordfinal);
    setisPasswordGenerated(true);
  };
  const createPassword = (character: String, passwordlength: number) => {
    let result = '';
    for (let i = 0; i < passwordlength; i++) {
      const characterIndex = Math.round(Math.random() * character.length);
      result += character.charAt(characterIndex);
    }
    return result;
  };

  const handleReset = () => {
    setPassword('');
    setisPasswordGenerated(false);
    lowerCaseSet(true);
    upperCaseSet(false);
    useNumber(false);
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>password generator</Text>
          <Formik
            initialValues={{passwordlength: ''}}
            validationSchema={Formvalidation}
            onSubmit={values => {
              generatePasswordString(Number(values.passwordlength));
            }}>
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              handleReset,
            }) => (
              <>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputColumn}>
                    {touched.passwordlength && errors.passwordlength && (
                      <Text style={styles.errorText}>
                        {errors.passwordlength}
                      </Text>
                    )}
                  </View>
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.inputStyle}
                    value={values.passwordlength}
                    onChangeText={handleChange('passwordlength')}
                    placeholder="Type your input here"
                  />
                </View>


                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>
                    Include lowercase  
                  </Text>
                  <BouncyCheckbox isChecked={lowerCase}  onPress={ () => lowerCaseSet(!lowerCase)} fillColor='green'/>
                </View>

                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>
                    Include UpperCase  
                  </Text>
                  <BouncyCheckbox isChecked={upperCase}  onPress={ () => upperCaseSet(!upperCase)} fillColor='green'/>
                </View>
             
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>
                    Include Number  
                  </Text>
                  <BouncyCheckbox isChecked={number}  onPress={ () => useNumber(!number)} fillColor='green'/>
                </View>

                <View style={styles.formActions}>
                  <TouchableOpacity 
                  disabled={!isValid}
                  style={styles.primaryBtn}
                  onPress={()=>handleSubmit}
                  >
                    <Text>GeneratePassword</Text>
                  </TouchableOpacity>
                  <TouchableOpacity  style={styles.secondaryBtn} onPress={()=>handleReset}>
                    <Text>Reset</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
    padding:12
  },
  inputWrapper: {
    marginBottom: 15,
    paddingRight:24,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '100%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color: '#000',
  },
});

export default App;
