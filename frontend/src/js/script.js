const routes = {
    users: `${API_BASE_URL}/users`,
    clientes: `${API_BASE_URL}/clients`,
    professionals: `${API_BASE_URL}/professionals`,
    consultations: `${API_BASE_URL}/consultations`
};

const apiService = {

    async _fetch(url, options = {}) {
        const response = await fetch(url, options);
        if (!response.ok && response.status !== 204) {
            throw new Error(`HTTP ${response.status} em ${url}`);
        }
        return response;
    },

    async getUsers() {
        const response = await this._fetch(routes.users);
        return response.json();
    },
    async getClients() {
        const response = await this._fetch(routes.clientes);
        return response.json();
    },
    async getProfessionals() {
        const response = await this._fetch(routes.professionals);
        return response.json();
    },
    async getUserById(id) {
        const response = await this._fetch(`${routes.users}/${id}`);
        return response.json();
    },
    async getClientById(id) {
        const response = await this._fetch(`${routes.clientes}/${id}`);
        return response.json();
    },
    async getProfessionalById(id) {
        const response = await this._fetch(`${routes.professionals}/${id}`);
        return response.json();
    },
    async getConsultationById(id) {
        const response = await this._fetch(`${routes.consultations}/${id}`);
        return response.json();
    },
    async getAvailableHours(date, type) {
        const response = await this._fetch(`${routes.consultations}/available?date=${date}&type=${type}`);
        return response.json();
    },
    async getAgenda(type) {
        const response = await this._fetch(`${routes.consultations}/agenda/${type}`);
        return response.json();
    },
    async getReports(type) {
        const response = await this._fetch(`${routes.consultations}/reports/${type}`);
        return response.json();
    },

    async login(login) {
        try {
            const response = await fetch(routes.users + '/login', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(login),
            });
            if (response.status === 200) {
                window.location.href = "src/inicio.html";
            } else if (response.status === 404) {
                document.getElementById('errorMessage').textContent = 'Usuário não encontrado';
            } else {
                document.getElementById('errorMessage').textContent = 'Usuário ou senha incorretos.';
            }
            return response.json();
        } catch (error) {
            document.getElementById('errorMessage').textContent = 'Erro de conexão com o servidor.';
        }
    },

    async postUser(user) {
        try {
            const response = await this._fetch(routes.users, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            });
            if (response.status === 201) {
                alert("Cadastro realizado com sucesso!");
                window.location.href = "inicio.html";
            }
        } catch (error) {
            alert("Erro ao realizar o cadastro. Tente novamente.");
        }
    },
    async postClient(client) {
        try {
            const response = await this._fetch(routes.clientes, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(client),
            });
            if (response.status === 201) {
                alert("Cadastro realizado com sucesso!");
                window.location.href = "inicio.html";
            }
        } catch (error) {
            alert("Erro ao realizar o cadastro. Tente novamente.");
        }
    },
    async postProfessional(professional) {
        try {
            const response = await this._fetch(routes.professionals, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(professional),
            });
            if (response.status === 201) {
                alert("Cadastro realizado com sucesso!");
                window.location.href = "inicio.html";
            }
        } catch (error) {
            alert("Erro ao realizar o cadastro. Tente novamente.");
        }
    },
    async postConsultation(consultation) {
        try {
            const response = await this._fetch(routes.consultations, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(consultation),
            });
            if (response.status === 201) {
                alert("Agendamento realizado com sucesso!");
                window.location.href = "inicio.html";
            }
        } catch (error) {
            alert("Erro ao realizar o agendamento. Tente novamente.");
        }
    },

    async updateClient(id, updatedClient) {
        try {
            const response = await this._fetch(`${routes.clientes}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedClient),
            });
            if (response.status === 200) {
                alert("Alterações realizadas com sucesso!");
                window.location.reload();
            }
        } catch (error) {
            alert("Erro ao realizar as alterações. Tente novamente.");
        }
    },
    async updateUser(id, updatedUser) {
        try {
            const response = await this._fetch(`${routes.users}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedUser),
            });
            if (response.status === 200) {
                alert("Alterações realizadas com sucesso!");
                window.location.reload();
            }
        } catch (error) {
            alert("Erro ao realizar as alterações. Tente novamente.");
        }
    },
    async updateProfessional(id, updatedProfessional) {
        try {
            const response = await this._fetch(`${routes.professionals}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedProfessional),
            });
            if (response.status === 200) {
                alert("Alterações realizadas com sucesso!");
                window.location.reload();
            }
        } catch (error) {
            alert("Erro ao realizar as alterações. Tente novamente.");
        }
    },
    async updateConsultation(id, updatedConsultation) {
        try {
            const response = await this._fetch(`${routes.consultations}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedConsultation),
            });
            if (response.status === 200) {
                alert("Alterações realizadas com sucesso!");
                window.location.reload();
            }
        } catch (error) {
            alert("Erro ao realizar as alterações. Tente novamente.");
        }
    },

    async deleteClient(id) {
        try {
            await this._fetch(`${routes.clientes}/${id}`, { method: "DELETE" });
            alert('Cliente deletado com sucesso');
            loadClients();
        } catch (error) {
            alert('Erro ao deletar cliente');
        }
    },
    async deleteUser(id) {
        try {
            await this._fetch(`${routes.users}/${id}`, { method: "DELETE" });
            alert('Colaborador deletado com sucesso');
            loadUsers();
        } catch (error) {
            alert('Erro ao deletar colaborador');
        }
    },
    async deleteProfessional(id) {
        try {
            await this._fetch(`${routes.professionals}/${id}`, { method: "DELETE" });
            alert('Profissional deletado com sucesso');
            loadProfessionals();
        } catch (error) {
            alert('Erro ao deletar profissional');
        }
    },
    async deleteConsultation(id) {
        try {
            await this._fetch(`${routes.consultations}/${id}`, { method: "DELETE" });
            alert('Consulta deletada com sucesso');
            window.location.reload();
        } catch (error) {
            alert('Erro ao deletar consulta');
        }
    },

};

async function main() {

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            await login();
        });
    }

    if (document.getElementById('listaClientesEditar')) await loadClients();
    if (document.getElementById('listaColaboradoresEditar')) await loadUsers();
    if (document.getElementById('listaProfissionaisEditar')) await loadProfessionals();
    if (document.getElementById('dentistaResponsavel')) await loadOptionProfessionals();
   
    const cadastroFormPaciente = document.getElementById('cadastroFormPaciente');
    if (cadastroFormPaciente) {
        cadastroFormPaciente.addEventListener('submit', async function(event) {
            event.preventDefault();
            await postClient();
        });
    }

    const cadastroFormColaborador = document.getElementById('cadastroFormColaborador');
    if (cadastroFormColaborador) {
        cadastroFormColaborador.addEventListener('submit', async function(event) {
            event.preventDefault();
            await postUser();
        });
    }

    const cadastroFormProfissional = document.getElementById('cadastroFormProfissional');
    if (cadastroFormProfissional) {
        cadastroFormProfissional.addEventListener('submit', async function(event) {
            event.preventDefault();
            await postProfessional();
        });
    }
    
    const updateFormPaciente = document.getElementById('updateFormPaciente');
    if (updateFormPaciente) {
        updateFormPaciente.addEventListener('submit', async function(event) {
            event.preventDefault();
            await updateClient();
        });
    }

    const updateFormColaborador = document.getElementById('updateFormColaborador');
    if (updateFormColaborador) {
        updateFormColaborador.addEventListener('submit', async function(event) {
            event.preventDefault();
            await updateUser();
        });
    }

    const updateFormProfissional = document.getElementById('updateFormProfissional');
    if (updateFormProfissional) {
        updateFormProfissional.addEventListener('submit', async function(event) {
            event.preventDefault();
            await updateProfessional();
        });
    }

    const updateFormConsultation = document.getElementById('updateFormConsultation');
    if (updateFormConsultation) {
        updateFormConsultation.addEventListener('submit', async function(event) {
            event.preventDefault();
            await updateConsultation();
        });
    }
    
    const consultation = document.getElementById('agendamento');
    if (consultation) {
        consultation.addEventListener('submit', async function(event) {
            event.preventDefault();
            await postConsultation();
        });
    }

    const agenda = document.getElementById('consultas-tab');
    if (agenda) {
        loadNormalAgenda();
    }

    const relatorio = document.getElementById('relatorios-tab');
    if (relatorio) {
        loadNormalReport();
    }

};

async function loadOptionProfessionals() {
    try {
        const response = await apiService.getProfessionals();

        const selectElement = document.getElementById('dentistaResponsavel');

        response.forEach(professional => {
            const option = document.createElement('option');
            option.value = professional.id; 
            option.textContent = professional.name; 
            selectElement.appendChild(option);
        });
    } catch (error) {
        console.error('Erro ao carregar os profissionais:', error);
    }
}

async function loadClients() {
    try {
        const response = await apiService.getClients();

        const tabelaEditar = document.getElementById('listaClientesEditar').getElementsByTagName('tbody')[0];
        tabelaEditar.innerHTML = '';

        response.forEach(client => {
            const linhaEditar = tabelaEditar.insertRow();
            linhaEditar.innerHTML = `
                <td>${client.id}</td>
                <td class="name-column">${client.name}</td>
                <td>${client.email}</td>
                <td>${client.phone}</td>
                <td>
                    <div class="button-group">
                        <button class="btn btn-warning btn-sm me-1" onclick="openModalClient(${client.id})">
                            <i class="bi bi-pencil-square"></i>
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="deleteClient(${client.id})">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>    
                </td>
            `;
        });

    } catch (error) {
        console.error('Erro ao carregar os clientes:', error);
    }
}

async function loadUsers() {
    try {
        const response = await apiService.getUsers();

        const tabelaEditar = document.getElementById('listaColaboradoresEditar').getElementsByTagName('tbody')[0];
        tabelaEditar.innerHTML = '';

        response.forEach(user => {
            const linhaEditar = tabelaEditar.insertRow();
            linhaEditar.innerHTML = `
                <td>${user.id}</td>
                <td class="name-column">${user.name}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
                <td>
                    <div class="button-group">
                        <button class="btn btn-warning btn-sm me-1" onclick="openModalUser(${user.id})">
                            <i class="bi bi-pencil-square"></i>
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.id})">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>    
                </td>
            `;
        });

    } catch (error) {
        console.error('Erro ao carregar os colaboradores:', error);
    }
}

async function loadProfessionals() {
    try {
        const response = await apiService.getProfessionals();

        const tabelaEditar = document.getElementById('listaProfissionaisEditar').getElementsByTagName('tbody')[0];
        tabelaEditar.innerHTML = '';

        response.forEach(profissional => {
            const linhaEditar = tabelaEditar.insertRow();
            linhaEditar.innerHTML = `
                <td>${profissional.id}</td>
                <td class="name-column">${profissional.name}</td>
                <td>${profissional.email}</td>
                <td>${profissional.phone}</td>
                <td>
                    <div class="button-group">
                        <button class="btn btn-warning btn-sm me-1" onclick="openModalProfessional(${profissional.id})">
                            <i class="bi bi-pencil-square"></i>
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="deleteProfessional(${profissional.id})">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>    
                </td>
            `;
        });

    } catch (error) {
        console.error('Erro ao carregar os profissionais:', error);
    }
}

async function loadAvailableData(scheduledHour) {
    const date = document.getElementById('dataConsulta').value;
    const type = document.getElementById('tipoConsulta').value;

    try {
        const availableHoursMap = await apiService.getAvailableHours(date, type);
        const hourSelect = document.getElementById('horarioList');
        hourSelect.innerHTML = '';

        const scheduledOption = document.createElement('option');
        scheduledOption.value = scheduledHour;
        if (typeof scheduledHour != 'undefined' && scheduledHour != '') {
            scheduledOption.text = scheduledHour;
        }
        else {
            scheduledOption.text = "Selecione um horário";
        }
        scheduledOption.selected = true; 
        hourSelect.appendChild(scheduledOption);

        const seenHours = new Set();
        const orderedHours = [];

        Object.entries(availableHoursMap).forEach(([professionalId, availableHours]) => {
            availableHours.forEach(hour => {
                if (!seenHours.has(hour) && hour !== scheduledHour) {
                    seenHours.add(hour);
                    orderedHours.push(hour);
                }
            });
        });

        orderedHours.sort((a, b) => a.localeCompare(b));

        orderedHours.forEach(hour => {
            const option = document.createElement('option');
            option.value = hour;
            option.text = hour;
            hourSelect.appendChild(option);
        });
        
    } catch (error) {
        console.error('Erro ao carregar horários disponíveis:', error);
    }
}



async function loadAvailableProfessionals() {
    const selectedHour = document.getElementById('horarioList').value;
    const date = document.getElementById('dataConsulta').value;
    const type = document.getElementById('tipoConsulta').value;

    try {
        const availableHoursMap = await apiService.getAvailableHours(date, type);
        const professionalSelect = document.getElementById('professionalList');
        professionalSelect.innerHTML = ''; 

        const allProfessionals = new Set();

        Object.entries(availableHoursMap).forEach(([professionalId, availableHours]) => {
            if (availableHours.includes(selectedHour)) {
                allProfessionals.add(professionalId);
            }
        });

        for (const professionalId of allProfessionals) {
            try {
                const professionalResponse = await apiService.getProfessionalById(professionalId);
                const professionalName = professionalResponse.name;
                const option = document.createElement('option');
                option.value = professionalId;
                option.text = professionalName;
                professionalSelect.appendChild(option);
            } catch (error) {
                console.error(`Erro ao buscar o profissional com ID ${professionalId}:, error`);
            }
        }

    } catch (error) {
        console.error('Erro ao carregar profissionais:', error);
    }
};

async function loadNormalAgenda() {
    try {
        const agenda = await apiService.getAgenda('normal');

        const listaConsultas = document.getElementById('consultas').getElementsByTagName('tbody')[0];
        listaConsultas.innerHTML = '';

        agenda.forEach(consulta => {
            const row = document.createElement('tr');          

            const dateCell = document.createElement('td');
            dateCell.textContent = formatDateForDisplay(consulta.consultDate); 
            row.appendChild(dateCell);

            const timeCell = document.createElement('td');
            timeCell.textContent = consulta.hourInit;
            row.appendChild(timeCell);

            const clientCell = document.createElement('td');
            clientCell.textContent = consulta.client.name; 
            row.appendChild(clientCell);

            const professionalCell = document.createElement('td');
            professionalCell.textContent = consulta.professional.name; 
            row.appendChild(professionalCell);

            const valueCell = document.createElement('td');
            valueCell.textContent = `R$ ${consulta.consultationValue.toFixed(2)}` 
            row.appendChild(valueCell);

            const actionsCell = document.createElement('td');

            const viewButton = document.createElement('button');
            viewButton.className = 'btn btn-info btn-sm me-1'; 
            viewButton.innerHTML = '<i class="bi bi-eye"></i>'; 
            viewButton.dataset.bsToggle = 'modal';
            viewButton.dataset.bsTarget = '#viewModal';
            viewButton.onclick = () => showDetails(consulta); 
            actionsCell.appendChild(viewButton);
            
            const editButton = document.createElement('button');
            editButton.className = 'btn btn-warning btn-sm me-1'; 
            editButton.innerHTML = '<i class="bi bi-pencil-square"></i>'; 
            editButton.onclick = () => openModalConsultation(consulta.id); 
            actionsCell.appendChild(editButton);
            
            const deleteButton = document.createElement('button');
            deleteButton.className = 'btn btn-danger btn-sm';
            deleteButton.innerHTML = '<i class="bi bi-trash"></i>'; 
            deleteButton.onclick = () => deleteConsultation(consulta.id); 
            actionsCell.appendChild(deleteButton);

            row.appendChild(actionsCell);

            listaConsultas.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao carregar consultas:', error);
    }
}

async function loadSurgeonAgenda() {
    try {
        const agenda = await apiService.getAgenda('cirurgia');
        const listaConsultas = document.getElementById('cirurgias').getElementsByTagName('tbody')[0];
        listaConsultas.innerHTML = ''; 

        agenda.forEach(consulta => {
            const row = document.createElement('tr');          

            const dateCell = document.createElement('td');
            dateCell.textContent = formatDateForDisplay(consulta.consultDate);
            row.appendChild(dateCell);

            const timeCell = document.createElement('td');
            timeCell.textContent = consulta.hourInit;
            row.appendChild(timeCell);

            const clientCell = document.createElement('td');
            clientCell.textContent = consulta.client.name; 
            row.appendChild(clientCell);
            
            const professionalCell = document.createElement('td');
            professionalCell.textContent = consulta.professional.name;
            row.appendChild(professionalCell);

            const valueCell = document.createElement('td');
            valueCell.textContent = `R$ ${consulta.consultationValue.toFixed(2)}`
            row.appendChild(valueCell);

            const actionsCell = document.createElement('td');

            const viewButton = document.createElement('button');
            viewButton.className = 'btn btn-info btn-sm me-1'; 
            viewButton.innerHTML = '<i class="bi bi-eye"></i>'; 
            viewButton.dataset.bsToggle = 'modal';
            viewButton.dataset.bsTarget = '#viewModal';
            viewButton.onclick = () => showDetails(consulta);
            actionsCell.appendChild(viewButton);
            
            const editButton = document.createElement('button');
            editButton.className = 'btn btn-warning btn-sm me-1'; 
            editButton.innerHTML = '<i class="bi bi-pencil-square"></i>'; 
            editButton.onclick = () => openModalConsultation(consulta.id); 
            actionsCell.appendChild(editButton);
            
            const deleteButton = document.createElement('button');
            deleteButton.className = 'btn btn-danger btn-sm';
            deleteButton.innerHTML = '<i class="bi bi-trash"></i>'; 
            deleteButton.onclick = () => deleteConsultation(consulta.id); 
            actionsCell.appendChild(deleteButton);

            row.appendChild(actionsCell);

            listaConsultas.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao carregar consultas:', error);
    }
}

async function loadNormalReport() {
    try {
        const report = await apiService.getReports('normal');

        const listaRelatorios = document.getElementById('consultas').getElementsByTagName('tbody')[0];
        listaRelatorios.innerHTML = '';

        report.forEach(consulta => {
            const row = document.createElement('tr'); 
            
            const idCell = document.createElement('td');
            idCell.textContent = consulta.id; 
            row.appendChild(idCell);

            const dateCell = document.createElement('td');
            dateCell.textContent = formatDateForDisplay(consulta.consultDate); 
            row.appendChild(dateCell);

            const timeCell = document.createElement('td');
            timeCell.textContent = consulta.hourInit;
            row.appendChild(timeCell);

            const clientCell = document.createElement('td');
            clientCell.textContent = consulta.client.name; 
            row.appendChild(clientCell);

            const professionalCell = document.createElement('td');
            professionalCell.textContent = consulta.professional.name; 
            row.appendChild(professionalCell);

            const valueCell = document.createElement('td');
            valueCell.textContent = `R$ ${consulta.consultationValue.toFixed(2)}` 
            row.appendChild(valueCell);

            listaRelatorios.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao carregar os relatórios:', error);
    }
}

async function loadSurgeonReport() {
    try {
        const report = await apiService.getReports('cirurgia')

        const listaRelatorios = document.getElementById('cirurgias').getElementsByTagName('tbody')[0];
        listaRelatorios.innerHTML = ''; 

        report.forEach(consulta => {
            const row = document.createElement('tr');          

            const idCell = document.createElement('td');
            idCell.textContent = consulta.id; 
            row.appendChild(idCell);

            const dateCell = document.createElement('td');
            dateCell.textContent = formatDateForDisplay(consulta.consultDate);
            row.appendChild(dateCell);

            const timeCell = document.createElement('td');
            timeCell.textContent = consulta.hourInit;
            row.appendChild(timeCell);

            const clientCell = document.createElement('td');
            clientCell.textContent = consulta.client.name; 
            row.appendChild(clientCell);
            
            const professionalCell = document.createElement('td');
            professionalCell.textContent = consulta.professional.name;
            row.appendChild(professionalCell);

            const valueCell = document.createElement('td');
            valueCell.textContent = `R$ ${consulta.consultationValue.toFixed(2)}`
            row.appendChild(valueCell);

            listaRelatorios.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao carregar os relatórios:', error);
    }
}

function showDetails(consulta) {
    const detalhesDiv = document.getElementById('consultaDetalhes');
    detalhesDiv.innerHTML = `
        <p><strong>ID:</strong> ${consulta.id}</p>
        <p><strong>Data:</strong> ${formatDateForDisplay(consulta.consultDate)}</p>
        <p><strong>Horário:</strong> ${consulta.hourInit}</p>
        <p><strong>Fim da Consulta:</strong> ${consulta.hourEnd}</p>

        <p><strong>Tipo de Consulta:</strong> ${consulta.type == 'normal' ? 'Normal' : 'Cirurgia'}</p>
        <p><strong>Cliente:</strong> ${consulta.client.name}</p>
        <p><strong>Profissional:</strong> ${consulta.professional.name}</p>
        <p><strong>Valor:</strong> R$ ${consulta.consultationValue.toFixed(2)}</p>
    `;
}


async function login() {
    const login = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    };

    await apiService.login(login);
}

async function postClient() {
    const cpf = document.getElementById('cpf').value;
    if (!validarCpf(cpf)) {
        alert('CPF inválido. Verifique o número informado.');
        return;
    }
    const client = {
        name: document.getElementById('nomeCompleto').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        birthdate: document.getElementById('dataNascimento').value,
        cpf: document.getElementById('cpf').value,
        rg: document.getElementById('rg').value,
        maritalStatus: document.getElementById('estadoCivil').value,
        gender: document.getElementById('sexo').value,
        address: await postAddress()
    };
        
    const response = await apiService.postClient(client);
};

async function postUser() {
    const cpf = document.getElementById('cpf').value;
    if (!validarCpf(cpf)) {
        alert('CPF inválido. Verifique o número informado.');
        return;
    }
    const user = {
        name: document.getElementById('nomeCompleto').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        birthdate: document.getElementById('dataNascimento').value,
        cpf: document.getElementById('cpf').value,
        rg: document.getElementById('rg').value,
        gender: document.getElementById('sexo').value,
        username: document.getElementById('username').value,
        password: document.getElementById('senha').value,
        address: await postAddress()
    };
    
    if (validarSenhas()) {
        const response = await apiService.postUser(user);
    }
};

async function postProfessional() {
    const cpf = document.getElementById('cpf').value;
    if (!validarCpf(cpf)) {
        alert('CPF inválido. Verifique o número informado.');
        return;
    }
    const professional = {
        name: document.getElementById('nomeCompleto').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        birthdate: document.getElementById('dataNascimento').value,
        cpf: document.getElementById('cpf').value,
        rg: document.getElementById('rg').value,
        gender: document.getElementById('sexo').value,
        specialization: document.getElementById('especializacao').value, 
        address: await postAddress()
    };
        
    const response = await apiService.postProfessional(professional);
};

async function buscarCep() {
    const cep = document.getElementById('cep').value.replace(/\D/g, '');
    if (cep.length !== 8) return;

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (data.erro) return;

        document.getElementById('rua').value = data.logradouro || '';
        document.getElementById('bairro').value = data.bairro || '';
        document.getElementById('cidade').value = data.localidade || '';
        document.getElementById('estado').value = data.uf || '';
        document.getElementById('pais').value = 'Brasil';
    } catch (error) {
        console.error('Erro ao buscar CEP:', error);
    }
}

function postAddress() {
    return {
        country: document.getElementById('pais').value,
        state: document.getElementById('estado').value,
        city: document.getElementById('cidade').value,
        zipCode: document.getElementById('cep').value,
        street: document.getElementById('rua').value,
        number: document.getElementById('numero').value,
        district: document.getElementById('bairro').value,
        addressComplement: document.getElementById('complemento').value
    };
}

async function postConsultation() {

    const consultation = {
        type: document.getElementById('tipoConsulta').value,
        consultDate: document.getElementById('dataConsulta').value,
        hourInit: document.getElementById('horarioList').value,
        consultationValue: document.getElementById('valorConsulta').value,
        client: {
            id: document.getElementById('idPaciente').value,
        },
        professional: {
            id: document.getElementById('professionalList').value,
        }
    };
    
    const response = await apiService.postConsultation(consultation);
};

async function updateClient() {
    const id = document.getElementById('id').value;

    const updatedClient = {
        name: document.getElementById('nomeCompleto').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        birthdate: document.getElementById('dataNascimento').value,
        cpf: document.getElementById('cpf').value,
        rg: document.getElementById('rg').value,
        maritalStatus: document.getElementById('estadoCivil').value,
        gender: document.getElementById('sexo').value,
        address: await postAddress()
    };
    
    try {
        const response = await apiService.updateClient(id, updatedClient);
    } catch (error) {
        console.error('Erro ao atualizar cliente:', error);
    }
}

async function updateUser() {
    const id = document.getElementById('id').value;

    const updatedUser = {
        name: document.getElementById('nomeCompleto').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        birthdate: document.getElementById('dataNascimento').value,
        cpf: document.getElementById('cpf').value,
        rg: document.getElementById('rg').value,
        gender: document.getElementById('sexo').value,
        username: document.getElementById('username').value,
        password: document.getElementById('senha').value,

        address: await postAddress()
    };
    
    
        const response = await apiService.updateUser(id, updatedUser);
    
}

async function updateProfessional() {
    const id = document.getElementById('id').value;

    const updatedProfessional = {
        name: document.getElementById('nomeCompleto').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        birthdate: document.getElementById('dataNascimento').value,
        cpf: document.getElementById('cpf').value,
        rg: document.getElementById('rg').value,
        gender: document.getElementById('sexo').value,
        specialization: document.getElementById('especializacao').value,
              
        address: await postAddress()
    };
    
    try {
        const response = await apiService.updateProfessional(id, updatedProfessional);
    } catch (error) {
        console.error('Erro ao atualizar profissional:', error);
    }
}

async function updateConsultation() {
    const id = document.getElementById('id').value;
    const consultation = await apiService.getConsultationById(id);
    const professionalId = consultation.professional.id;

    const updatedConsultation = {
        type: document.getElementById('tipoConsulta').value,
        consultDate: formatDate(document.getElementById('dataConsulta').value),
        hourInit: document.getElementById('horarioList').value,
        consultationValue: document.getElementById('value').value,
        client: {
            id: document.getElementById('clientId').value,
        },
        professional: {
            id: professionalId,
        }
    };
    
    try {
        const response = await apiService.updateConsultation(id, updatedConsultation);
    } catch (error) {
        console.error('Erro ao atualizar a consulta:', error);
    }
}

async function deleteClient(id) {
    if (confirm('Deseja realmente deletar este cliente?')) {
        await apiService.deleteClient(id);
    }
}

async function deleteUser(id) {
    if (confirm('Deseja realmente deletar este colaborador?')) {
        await apiService.deleteUser(id);
    }
}

async function deleteProfessional(id) {
    if (confirm('Deseja realmente deletar este profissional?')) {
        await apiService.deleteProfessional(id);
    }
}

async function deleteConsultation(id) {
    if (confirm('Deseja realmente deletar esta consulta?')) {
        await apiService.deleteConsultation(id);
    }
}

function populateFormAddress(address) {
    document.getElementById('pais').value = address.country;
    document.getElementById('estado').value = address.state;
    document.getElementById('cidade').value = address.city;
    document.getElementById('cep').value = address.zipCode;
    document.getElementById('rua').value = address.street;
    document.getElementById('numero').value = address.number;
    document.getElementById('bairro').value = address.district;
    document.getElementById('complemento').value = address.addressComplement;
}

async function openModalClient(id) {
    try {
        const client = await apiService.getClientById(id);
        document.getElementById('id').value = client.id;
        document.getElementById('nomeCompleto').value = client.name;
        document.getElementById('email').value = client.email;
        document.getElementById('phone').value = client.phone;
        document.getElementById('dataNascimento').value = formatDate(client.birthdate);
        document.getElementById('dataCadastro').value = formatDate(client.registrationDate);
        document.getElementById('cpf').value = client.cpf;
        document.getElementById('rg').value = client.rg;
        document.getElementById('sexo').value = genderValue(client.gender);
        document.getElementById('estadoCivil').value = maritalStatusValue(client.maritalStatus);
        populateFormAddress(client.address);
        showModal();
    } catch (error) {
        console.error('Erro ao carregar dados do paciente:', error);
        alert('Não foi possível carregar os dados do paciente.');
    }
}

async function openModalUser(id) {
    try {
        const user = await apiService.getUserById(id);
        document.getElementById('id').value = user.id;
        document.getElementById('nomeCompleto').value = user.name;
        document.getElementById('email').value = user.email;
        document.getElementById('phone').value = user.phone;
        document.getElementById('dataNascimento').value = formatDate(user.birthdate);
        document.getElementById('dataCadastro').value = formatDate(user.registrationDate);
        document.getElementById('cpf').value = user.cpf;
        document.getElementById('rg').value = user.rg;
        document.getElementById('sexo').value = genderValue(user.gender);
        document.getElementById('username').value = user.username;
        document.getElementById('senha').value = user.password;
        populateFormAddress(user.address);
        showModal();
    } catch (error) {
        console.error('Erro ao carregar dados do colaborador:', error);
        alert('Não foi possível carregar os dados do colaborador.');
    }
}

async function openModalProfessional(id) {
    try {
        const professional = await apiService.getProfessionalById(id);
        document.getElementById('id').value = professional.id;
        document.getElementById('nomeCompleto').value = professional.name;
        document.getElementById('email').value = professional.email;
        document.getElementById('phone').value = professional.phone;
        document.getElementById('dataNascimento').value = formatDate(professional.birthdate);
        document.getElementById('dataCadastro').value = formatDate(professional.registrationDate);
        document.getElementById('cpf').value = professional.cpf;
        document.getElementById('rg').value = professional.rg;
        document.getElementById('sexo').value = genderValue(professional.gender);
        document.getElementById('especializacao').value = specializationValue(professional.specialization);
        populateFormAddress(professional.address);
        showModal();
    } catch (error) {
        console.error('Erro ao carregar dados do profissional:', error);
        alert('Não foi possível carregar os dados do profissional.');
    }
}

async function openModalConsultation(id) {
    try {
        const consultation = await apiService.getConsultationById(id);
        document.getElementById('id').value = consultation.id;
        document.getElementById('dataConsulta').value = consultation.consultDate;
        document.getElementById('tipoConsulta').value = consultation.type;
        document.getElementById('value').value = consultation.consultationValue;
        document.getElementById('client').value = consultation.client.name;
        document.getElementById('clientId').value = consultation.client.id;
        document.getElementById('professional').value = consultation.professional.name;
        await loadAvailableData(consultation.hourInit);
        showModal();
    } catch (error) {
        console.error('Erro ao carregar dados da consulta:', error);
        alert('Não foi possível carregar os dados da consulta.');
    }
}


async function filterPacientes() {
    const query = document.getElementById('searchPaciente').value;
    if (query.length > 2) {
        try {
            const response = await apiService._fetch(`${routes.clientes}?name=${query}`);
            const pacientes = await response.json();

        const pacienteList = document.getElementById('pacienteList');
        pacienteList.innerHTML = '';

            pacientes.forEach(paciente => {
                const li = document.createElement('li');
                li.classList.add('list-group-item');
                li.textContent = paciente.name;
                li.onclick = () => selectPaciente(paciente);
                pacienteList.appendChild(li);
            });
        } catch (error) {
            console.error('Erro ao buscar pacientes:', error);
        }
    } else {
        document.getElementById('pacienteList').innerHTML = '';
    }
}

function selectPaciente(paciente) {
    document.getElementById('idPaciente').value = paciente.id;
    document.getElementById('nomePaciente').value = paciente.name;
    const modal = bootstrap.Modal.getInstance(document.getElementById('pacienteModal'));
    document.getElementById('pacienteList').innerHTML = '';
    document.getElementById('searchPaciente').value = '';
    modal.hide();
}

function showModal() {
    const editModal = new bootstrap.Modal(document.getElementById('editModal'));
    editModal.show();      
}

function validarCpf(cpf) {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(cpf[i]) * (10 - i);
    let digito1 = (soma * 10) % 11;
    if (digito1 === 10 || digito1 === 11) digito1 = 0;
    if (digito1 !== parseInt(cpf[9])) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf[i]) * (11 - i);
    let digito2 = (soma * 10) % 11;
    if (digito2 === 10 || digito2 === 11) digito2 = 0;
    return digito2 === parseInt(cpf[10]);
}

function validarSenhas() {
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;

    const mensagemErro = document.getElementById('mensagemErro');

    if (senha !== confirmarSenha) {
        mensagemErro.style.display = 'block';
        return false;
    } else {
        mensagemErro.style.display = 'none';
        return true;
    }
}


function genderValue(status) {
    const genderMap = {
        "MALE": 0,
        "FEMALE": 1,
        "OTHER": 2
    };
    return genderMap[status];
}

function maritalStatusValue(status) {
    const maritalStatusMap = {
        "SINGLE": 0,
        "MARRIED": 1,
        "DIVORCED": 2,
        "WIDOWED": 3
    };
    return maritalStatusMap[status];
}

function specializationValue(status) {
    const specializationMap = {
        "CLINICAL": 0,
        "SURGEON": 1
    };
    return specializationMap[status];
}

function formatDateForDisplay(inputDate) {
    const date = new Date(inputDate);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${day}/${month}/${year}`;
}

function formatDate(inputDate) {
    const date = new Date(inputDate);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

main();





