/* archivo para crear las tablas en la base de datos */

export default class Tablas {
  private conn;

  constructor(conn: any) {
    this.conn = conn;
  }

  async usuarios() {
    try {
      await this.conn`
        CREATE TABLE IF NOT EXISTS usuarios (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          nombre VARCHAR(100) NOT NULL,
          email VARCHAR(100) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          rol VARCHAR(20) NOT NULL DEFAULT 'psicologo',
          creado_en TIMESTAMP DEFAULT NOW()
        )
      `;
    } catch (error) {
      return { mensaje: "Ocurrio un error", error };
    }
  }

  async pacientes() {
    try {
      await this.conn`
        CREATE TABLE IF NOT EXISTS pacientes (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          nombre VARCHAR(100) NOT NULL,
          apellido VARCHAR(100) NOT NULL,
          email VARCHAR(100),
          telefono VARCHAR(20),
          fecha_nacimiento DATE,
          motivo_consulta TEXT,
          diagnostico VARCHAR(200),
          contacto_emergencia VARCHAR(100),
          telefono_emergencia VARCHAR(20),
          creado_en TIMESTAMP DEFAULT NOW()
        )
      `;
    } catch (error) {
      return { mensaje: "Ocurrio un error", error };
    }
  }

  async citas() {
    try {
      await this.conn`
        CREATE TABLE IF NOT EXISTS citas (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          paciente_id UUID REFERENCES pacientes(id) ON DELETE CASCADE,
          fecha DATE NOT NULL,
          hora TIME NOT NULL,
          duracion_min INT DEFAULT 50,
          estado VARCHAR(20) NOT NULL DEFAULT 'programada',
          frecuencia VARCHAR(20),
          notas_previas TEXT,
          creado_en TIMESTAMP DEFAULT NOW()
        )
      `;
    } catch (error) {
      return { mensaje: "Ocurrio un error", error };
    }
  }

  async notas() {
    try {
      await this.conn`
        CREATE TABLE IF NOT EXISTS notas_sesion (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          cita_id UUID REFERENCES citas(id) ON DELETE CASCADE,
          paciente_id UUID REFERENCES pacientes(id) ON DELETE CASCADE,
          texto TEXT NOT NULL,
          objetivos TEXT,
          tarea TEXT,
          es_privada BOOLEAN DEFAULT TRUE,
          creado_en TIMESTAMP DEFAULT NOW()
        )
      `;
    } catch (error) {
      return { mensaje: "Ocurrio un error", error };
    }
  }

  async seguimiento() {
    try {
      await this.conn`
        CREATE TABLE IF NOT EXISTS seguimiento_emocional (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          cita_id UUID REFERENCES citas(id) ON DELETE CASCADE,
          paciente_id UUID REFERENCES pacientes(id) ON DELETE CASCADE,
          ansiedad INT CHECK (ansiedad >= 1 AND ansiedad <= 10),
          estado_animo INT CHECK (estado_animo >= 1 AND estado_animo <= 10),
          calidad_sueno INT CHECK (calidad_sueno >= 1 AND calidad_sueno <= 10),
          creado_en TIMESTAMP DEFAULT NOW()
        )
      `;
    } catch (error) {
      return { mensaje: "Ocurrio un error", error };
    }
  }

  async pagos() {
    try {
      await this.conn`
        CREATE TABLE IF NOT EXISTS pagos (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          paciente_id UUID REFERENCES pacientes(id) ON DELETE CASCADE,
          cita_id UUID REFERENCES citas(id) ON DELETE CASCADE,
          monto DECIMAL(10,2) NOT NULL,
          metodo_pago VARCHAR(20) NOT NULL,
          estado VARCHAR(20) NOT NULL DEFAULT 'pendiente',
          stripe_id VARCHAR(100),
          creado_en TIMESTAMP DEFAULT NOW()
        )
      `;
    } catch (error) {
      return { mensaje: "Ocurrio un error", error };
    }
  }
}
