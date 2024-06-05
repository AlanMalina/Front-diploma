import axios from 'axios';

class Diia {

  async getData(req, res) {
    try {
      const response = await axios.get('https://data.gov.ua/api/3/action/package_show?id=381e4f35-822d-4022-9dc3-e811b522331d');
      if (response.data) { // Перевірка наявності будь-яких даних
        res.json(response.data.result.resources);
      } else {
        res.status(404).json({ message: 'Data not found' }); // Або більш специфічне повідомлення
      }
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
}

export default new Diia();
