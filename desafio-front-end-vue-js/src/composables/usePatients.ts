import { reactive } from 'vue';

interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  motherName: string,
  birthdate: string,
  cpf: string,
  cns: string,
  cep: string,
  street: string,
  number: string,
  complement: string,
  neighborhood: string,
  city: string,
  state: string,
  
}

interface UsePatients {
  patients: Patient[];
  addPatient: (patient: Patient) => void;
  editPatient: (index: number, patient: Patient) => void;
  deletePatient: (index: number) => void;
}
 export async function getUsers () {
  try {
    const response = await fetch('/users');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return  await response.json()
      
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }

    
}



export const usePatients = (): UsePatients => {
 
 getUsers().then(data => {
    data.forEach((patient: { id: number; name: string; age: number; gender: string; motherName: string; birthdate: string; cpf: string; cns: string; cep: string; street: string; number: string; complement: string; neighborhood: string; city: string; state: string; } ) => {
      patients.push(patient);
    });

  });



  const patients = reactive<Patient[]>([ ]);

  const addPatient = (patient: Patient) => {
    patients.push(patient);
  };

  const editPatient = (index: number, patient: Patient) => {
    patients[index] = patient;
    
  };

  const deletePatient = async (index: number) => {
    patients.splice(index, 1);
    const patient = patients.find((patient)=> patient.id === index)
  
    try {
      const response = await fetch(`/users/${patient?.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return {
    patients,
    addPatient,
    editPatient,
    deletePatient,
  };
};
