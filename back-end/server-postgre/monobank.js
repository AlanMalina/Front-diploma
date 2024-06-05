import axios from 'axios';

class Monobank{
    async getCurrencyRates(req, res){
        try {

            const config = {
                headers: {
                    'X-Token': 'YOUR_MONOBANK_TOKEN',
                    'X-Key-Id': 'YOUR_MONOBANK_KEY_ID'
                }
            };
            
            const currencyResponse = await axios.get('https://api.monobank.ua/bank/currency', config);
            const currencyData = currencyResponse.data;

            // Перевірка статусу відповіді від сервера
            if (currencyResponse.status !== 200) {
                const errorMessage = 'Помилка при отриманні даних. Статус: ' + currencyResponse.status + ', ' + clientInfoResponse.status;
                res.status(500).json({ message: errorMessage });
                return;
            }
            
            // const data = currencyResponse.data;
            
            // Перевірка на існування rates у відповіді
            if (Array.isArray(currencyData)) {
                // Фільтрація курсів валют за валютою USD
                const usdCourses = currencyData.filter(course => course.currencyCodeA === 840 && course.currencyCodeB === 980);
                const eurCourses = currencyData.filter(course => course.currencyCodeA === 978 && course.currencyCodeB === 980);
    
                const combinedCourses = [...usdCourses, ...eurCourses];
                // Якщо знайдено курси валюти USD
                if (combinedCourses.length > 0) {
                    const formattedCourses = combinedCourses.map(course => ({
                        currencyCodeA: course.currencyCodeA,
                        currencyCodeB: course.currencyCodeB,
                        date: course.date,
                        rateBuy: course.rateBuy,
                        rateSell: course.rateSell,
                        rateCross: course.rateCross
                    }));
                    res.json(formattedCourses); // Відправлення відформатованих курсів валют USD
                } else {
                    throw new Error('Курси валюти USD не знайдено.');
                }
            } else {
                throw new Error('Помилка при отриманні курсів валют. Неправильний формат відповіді.');
            }
        } catch (error) {
            // Обробка помилки
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    };


    async getClientId(req, res){
        try {
            const config = {
                headers: {
                    'X-Token': 'uWNS45L9n9CucrbnyCrSLSpjZOMsF3ClgZVlP_Tl627I',
                    'X-Key-Id': 'YOUR_MONOBANK_KEY_ID'
                }
            };
    
            const response = await axios.get('https://api.monobank.ua/personal/client-info', config);
            res.json(response.data);
        } catch (error) {
            console.error('Error fetching client info:', error);
            res.status(500).json({ error: 'Failed to fetch client info' });
        }
    }

    async paymentOnAccount(req, res, recipientName, recipientAccount, amount, descriptionData) {
        try {
          const config = {
            headers: {
              'X-Token': 'upaPwHCWRQQrSh4kiJ9_8-i3_oAlk5I_OsDlk6pa6tjA',
              'X-Key-Id': 'YOUR_MONOBANK_KEY_ID', // Замініть на ваш ключ API
              'Content-Type': 'application/json'
            }
          };
          
          
          const requestData = {
            recipientName,
            recipientAccount,
            amount,
            description: descriptionData // Оновлено до об'єкта
          };
    
          const response = await axios.post('https://api.monobank.ua/api/merchant/invoice/payment-direct', requestData, config);
    
          if (response.data.success) {
            res.status(200).json({ message: 'Платіж успішно створено', paymentInfo: response.data });
          } else {
            res.status(response.data.errorCode || 400).json({ message: 'Не вдалося створити платіж', error: response.data.errorMessage });
          }
        } catch (error) {
          console.error('Помилка створення платежу:', error.message);
          res.status(500).json({ message: 'Внутрішня помилка сервера' });
        }
      }
    
}




export default new Monobank();
