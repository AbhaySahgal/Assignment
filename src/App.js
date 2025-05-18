import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';

export default function App() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [contact, setContact] = useState('');
    const [gender, setGender] = useState('');
    const [area, setArea] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [districtCode, setDistrictCode] = useState('');
    const [lgdCode, setLgdCode] = useState('');
    const [stateCode, setStateCode] = useState('');

    const handleSubmit = () => {
        const data = {
            fullName: fullName,
            email: email,
            dateOfBirth: dob,
            contactNumber: contact,
            gender: parseInt(gender),
            area: area,
            city: city,
            street: street,
            counsellorId: 0,
            refCountry: {
                countryCode: countryCode,
                id: 1
            },
            refDistrict: {
                distCode: districtCode,
                lgdDistCode: parseInt(lgdCode)
            },
            stateId: {
                stCode: stateCode
            },
            statusId: 1
        };

        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(response => {
                Alert.alert('Form Submitted', JSON.stringify(response, null, 2));
            })
            .catch(error => {
                Alert.alert('Error', 'Failed to submit data.');
                console.log(error);
            });
    };

    return (
        <ScrollView
      contentContainerStyle={styles.wrapper}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Assignment Abhay Sahgal</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          placeholder="Enter full name"
          value={fullName}
          onChangeText={setFullName}
          style={styles.input}
          autoCapitalize="words"
          multiline={false}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          placeholder="Enter email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          multiline={false}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Date of Birth (DD/MM/YYYY)</Text>
        <TextInput
          placeholder="DD/MM/YYYY"
          value={dob}
          onChangeText={setDob}
          style={styles.input}
          multiline={false}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Contact Number</Text>
        <TextInput
          placeholder="Enter contact number"
          value={contact}
          onChangeText={setContact}
          style={styles.input}
          keyboardType="phone-pad"
          multiline={false}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Gender (0 for Male, 1 for Female)</Text>
        <TextInput
          placeholder="0 or 1"
          value={gender}
          onChangeText={setGender}
          style={styles.input}
          keyboardType="numeric"
          multiline={false}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Area</Text>
        <TextInput
          placeholder="Enter area"
          value={area}
          onChangeText={setArea}
          style={styles.input}
          multiline={false}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>City</Text>
        <TextInput
          placeholder="Enter city"
          value={city}
          onChangeText={setCity}
          style={styles.input}
          multiline={false}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Street</Text>
        <TextInput
          placeholder="Enter street"
          value={street}
          onChangeText={setStreet}
          style={styles.input}
          multiline={false}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Country Code</Text>
        <TextInput
          placeholder="Enter country code"
          value={countryCode}
          onChangeText={setCountryCode}
          style={styles.input}
          multiline={false}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>District Code</Text>
        <TextInput
          placeholder="Enter district code"
          value={districtCode}
          onChangeText={setDistrictCode} 
          style={styles.input}
          keyboardType="numeric"
          multiline={false}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>LGD District Code</Text>
        <TextInput
          placeholder="Enter LGD district code"
          value={lgdCode}
          onChangeText={setLgdCode}
          style={styles.input}
          keyboardType="numeric"
          multiline={false}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>State Code</Text>
        <TextInput
          placeholder="Enter state code"
          value={stateCode}
          onChangeText={setStateCode}
          style={styles.input}
          keyboardType="numeric"
          multiline={false}
        />
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Information</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    flexGrow: 1,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 30,
    textAlign: 'center'
  },
  inputContainer: {
    marginBottom: 12
  },
  label: {
    fontSize: 16,
    color:'#343a40',
    marginBottom: 6
  },
  input: {
    borderColor: '#ced4da',
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
    color: '#343a40'
  },
  submitButton: {
    backgroundColor: '#007bff',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  }
});