document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('invitationForm')

  form.addEventListener('submit', async event => {
    event.preventDefault() // Prevenir que el formulario recargue la página

    const name = document.getElementById('name').value
    const withPartner = document.getElementById('withPartner').checked

    // Crear objeto con los datos del formulario
    const data = {
      name: name,
      withPartner: withPartner,
    }

    try {
      // Hacer la petición POST con fetch
      const response = await fetch('/v1/submit-invitation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      // Manejar la respuesta del servidor
      const result = await response.text()
      document.getElementById('response').innerText = result
    } catch (error) {
      console.error('Error:', error)
    }
  })
})
