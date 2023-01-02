import { useState } from "react";
import styles from "./App.module.css";
import poweredImage from "./assets/powered.png";
import leftArrowImage from "./assets/leftArrow.png";
import { levels, calculateImc, Level } from "./helpers/imc";
import { GridItem } from "./components/gridItem/GridItem";
const App = () => {
  const [heightField, setHeightField] = useState<number>(0);
  const [WeightField, setWeightField] = useState<number>(0);
  const [toShow, setToShow] = useState<Level | null>(null);
  const handleCalculateButton = () => {
    if (heightField && WeightField) {
      setToShow(calculateImc(heightField, WeightField));
    } else {
      window.alert("Digite todos os campos.");
    }
  };
  const handleBackButton = () => {
    setToShow(null);
    setHeightField(0);
    setWeightField(0);
  };
  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={poweredImage} width={150} alt="" />
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC.</h1>
          <p>
            IMC é a sigla para índice de Massa Corpórea, parametro adotado pela
            OMS
          </p>
          <input
            type="number"
            placeholder="Digite a sua altura em metros. Ex: 1.88 ('em Metros')"
            value={heightField > 0 ? heightField : ""}
            onChange={(e) => setHeightField(parseFloat(e.target.value))}
            disabled={toShow ? true : false}
          />
          <input
            type="number"
            placeholder="Digite o seu peso em kg. Ex: 98 ('em kg')"
            value={WeightField > 0 ? WeightField : ""}
            onChange={(e) => setWeightField(parseFloat(e.target.value))}
            disabled={toShow ? true : false}
          />
          <button
            onClick={handleCalculateButton}
            disabled={toShow ? true : false}
          >
            Calcular
          </button>
        </div>

        <div className={styles.rightSide}>
          {!toShow && (
            <div className={styles.grid}>
              {levels.map((item, key) => (
                <GridItem key={key} item={item} />
              ))}
            </div>
          )}
          {toShow && (
            <div className={styles.rightBig}>
              <div className={styles.rightArrow} onClick={handleBackButton}>
                <img src={leftArrowImage} alt="" width={25} />
              </div>
              <GridItem item={toShow} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default App;
