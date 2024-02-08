(function () {
    const navbar = `
    <header>
        <div class="menu-container">
            <div class="menu-box">
                <nav>
                    <ul class="menu-horizontal">
                        <li class="drop-hover"><a href="#">Cadastros <i class="bi bi-caret-down-fill"></i></a>
                            <div class="drop">
                                <a href="cadastro-paciente.html">Paciente</a>
                                <a href="cadastro-colaborador.html">Colaborador</a>
                                <a href="cadastro-profissional.html">Profissional</a>
                            </div>
                        </li>
                        <li class="drop-hover"><a href="#">Gerencial <i class="bi bi-caret-down-fill"></i></a>
                            <div class="drop">
                                <a href="gerencial-paciente.html">Paciente</a>
                                <a href="gerencial-colaborador.html">Colaborador</a>
                                <a href="gerencial-profissional.html">Profissional</a>
                            </div>
                        </li>
                        <li class="drop-hover-consulta"><a href="#">Consultas <i class="bi bi-caret-down-fill"></i></a>
                            <div class="drop">
                                <a href="agendamento.html">Agendamento</a>
                                <a href="agenda.html">Agenda</a>
                            </div>
                        </li>
                        <li><a href="relatorio.html">Relatórios</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>`;

    document.body.insertAdjacentHTML("afterbegin", navbar);
})();
