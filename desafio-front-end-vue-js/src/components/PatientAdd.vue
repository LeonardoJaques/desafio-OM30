
<template>
    <div class="container mx-auto">
        <form @submit.prevent="submitForm">
            <h2 class="text-lg font-bold mb-4">Cadastro de Paciente</h2>
            <div class="mb-4">
                <label class="block font-bold mb-2" for="name">
                    Nome Completo*
                </label>
                <input class="w-full px-4 py-2 border rounded" id="name" type="text" v-model="form.name" required>
            </div>

            <div class="mb-4">
                <label class="block font-bold mb-2" for="motherName">
                    Nome Completo da Mãe*
                </label>
                <input class="w-full px-4 py-2 border rounded" id="motherName" type="text" v-model="form.motherName"
                    required>
            </div>
            <div class="mb-4">
                <label class="block font-bold mb-2" for="birthdate">
                    Data de Nascimento*
                </label>
                <input class="w-full px-4 py-2 border rounded" id="birthdate" type="date" v-model="form.birthdate" required>
            </div>
            <div class="mb-4">
                <label class="block font-bold mb-2" for="gender">
                    Gênero*
                </label>
                <select class="w-full px-4 py-2 border rounded" id="gender" v-model="form.gender" required>
                    <option value="" disabled selected>Selecione uma opção</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Outros">Outros</option>
                </select>
            </div>
            <div class="mb-4">
                <label class="block font-bold mb-2" for="cpf">
                    CPF*
                </label>
                <input class="w-full px-4 py-2 border rounded" id="cpf" type="text" v-model="form.cpf" @blur="validaCPF"
                    @keydown="onlyNumbers" maxlength='11' required>
                <div v-if="cpfError" class="text-red-500 mt-2">{{ cpfError }}</div>
            </div>
            <div class="mb-4">
                <label class="block font-bold mb-2" for="cns">
                    CNS*
                </label>
                <input class="w-full px-4 py-2 border rounded" id="cns" type="text" v-model="form.cns" maxlength='15'
                    @blur="validaCns" @keydown="onlyNumbers" required>
                <div v-if="cnsError" class="text-red-500 mt-2">{{ cnsError }}</div>
            </div>
            <div class="mb-4">
                <label class="block font-bold mb-2" for="cep">
                    CEP*
                </label>
                <input class="w-full px-4 py-2 border rounded" id="cep" type="text" v-model="form.cep" maxlength='9'
                    @blur="searchAddress" @keydown="onlyNumbers" required>
                <div v-if="cepError" class="text-red-500 mt-2">{{ cepError }}</div>
            </div>
            <div class="mb-4">
                <label class="block font-bold mb-2" for="street">
                    Rua*
                </label>
                <input class="w-full px-4 py-2 border rounded" id="street" type="text" v-model="form.street" required>
            </div>
            <div class="mb-4">
                <label class="block font-bold mb-2" for="number">
                    Número*
                </label>
                <input class="w-full px-4 py-2 border rounded" id="number" name="number" type="text"
                    placeholder="Digite o número" v-model="form.number" required @keydown="onlyNumbers" maxlength='' />
            </div>

            <button class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' @click="submitForm">
                Enviar
            </button>


        </form>
    </div>
</template>        
  
<script setup>
import { ref, watch, reactive, onMounted, computed } from 'vue';
import { getUsers } from '@/composables/usePatients'
import store from '@/stores/store'
import router from '@/router';


const patients = []

onMounted(async () => {
    await getUsers().then(data => {
        data.forEach((patient) => {
            patients.push(patient);
        });
    });
})

const form = reactive({
    id: "",
    name: "",
    motherName: "",
    birthdate: "",
    cpf: "",
    cns: "",
    cep: "",
    street: "",
    number: "",
    neighborhood: "",
    city: "",
    state: "",

});


const isFormValid = computed(() => {
  return (
    form.name !== "" &&
    form.motherName !== "" &&
    form.birthdate !== "" &&
    form.cpf !== "" &&
    form.cns !== "" &&
    form.cep !== "" &&
    form.street !== "" &&
    form.number !== "" &&
    form.neighborhood !== "" &&
    form.city !== "" &&
    form.state !== ""
  );
});

const cpfError = ref("");
const cnsError = ref("");
const cepError = ref("");

const onlyNumbers = (event) => {
    // Allow numeric input, delete, backspace, and arrow keys
    const allowedKeys = [
        "Delete",
        "Backspace",
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
        "Tab",
        "Enter",
    ];
    if (!/^\d+$/.test(event.key) && !allowedKeys.includes(event.key)) {
        event.preventDefault();
    }
};




function validaCPF(cpf) {
    const cleanCPF = String(cpf).replace(/\D/g, '');
    if (cleanCPF.length !== 11 || /^(\d)\1{10}$/.test(cleanCPF)) {
        return false;
    }

    const digit1 = calculateDigit(cleanCPF.substring(0, 9));
    const digit2 = calculateDigit(cleanCPF.substring(0, 9) + digit1);

    return digit1 + '' + digit2 === cleanCPF.substring(9);

    function calculateDigit(str) {
        let sum = 0;
        let reverse = str.length + 1;
        for (let i = 0; i < str.length; i++) {
            sum += str[i] * reverse--;
        }
        const digit = 11 - (sum % 11);
        return digit > 9 ? 0 : digit;
    }
}

function validaCns(cns) {
    if (String(cns).trim().length !== 15) {
        return false;
    }

    if (cns.substring(0, 1) === "1" || cns.substring(0, 1) === "2") {
        let pis = cns.substring(0, 11);
        let soma = 0;
        let peso = 15;

        for (let i = 0; i < 11; i++) {
            soma += parseInt(pis.charAt(i)) * peso;
            peso--;
        }

        let resto = soma % 11;
        let dv = 11 - resto;

        if (dv === 10 || dv === 11) {
            dv = 0;
        }

        let resultado = pis + "000" + dv;

        return cns === resultado;
    } else if (cns.substring(0, 1) === "7" || cns.substring(0, 1) === "8" || cns.substring(0, 1) === "9") {
        let soma = 0;
        let peso = 15;

        for (let i = 0; i < 15; i++) {
            soma += parseInt(cns.charAt(i)) * peso;
            peso--;
        }

        let resto = soma % 11;

        return resto === 0;
    }

    return false;
}



async function searchAddress(cep) {
    // Address search logic using CEP API

    const url = `/api/ws/${cep}/json/`
    const response = await fetch(url);
    const data = await response.json();

    if (data.erro) {

        // If CEP is invalid, set the error message
        cepError.value = "CEP não encontrado";
        throw new Error("CEP não encontrado");

    }

    return fetchForm(data);

}



function fetchForm(data) {
    form.id = patients.length + 1
    form.street = data?.logradouro || "sem nome da rua";
    form.neighborhood = data?.bairro || "sem nome do bairro";
    form.city = data?.localidade;
    form.state = data?.uf;


}



watch(
    [() => form.cep, () => form.cns, () => form.cpf], async ([cep, cns, cpf]) => {
        if (cep && cep.length >= 8) {
            await searchAddress(cep);
        }
        if (cns && !validaCns(cns)) {
            cnsError.value = "CNS Inválido";
        } else {
            cnsError.value = "";
        }

        if (!validaCPF(cpf)) {
            cpfError.value = "CPF Inválido"
        }
        else {
            cpfError.value = ""
        }

    }
);





async function submitForm() {
    if(cnsError.value === "CNS Inválido") return
    if(cpfError.value === "CPF Inválido") return

        if (isFormValid.value ){
        try {
            const response = await fetch(`/users`, {
                method: 'POST',
                body: JSON.stringify(form),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            store.setUserData(form)
            router.push({ name: 'PatientView' })
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
        
    }

}
</script>
  