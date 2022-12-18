<?php
    // classes
    $MAIN = NULL;

    class MainClass
    {
        // private array of available languages
        private $available_languages = array("de", "en");
        
        public $language;
        public $platform;
        public $platformType;

        function __construct($l, $p)
        {
            $lang = substr($l, 0, 2);

            $this->language = ($this->checkLang($lang)) ? $lang : "en";

            $this->platform = $p;
        }

        private function checkLang($lang)
        {
            return (in_array($lang, $this->available_languages)) ? TRUE : FALSE;
        }

        public function sendInfoXml()
        {
            if ($handler = opendir("../data/xml"))
            {
                while (($file = readdir($handler)) !== FALSE)
                {
                    if ($file != "line.xml" && $file != "." && $file != ".." && fileEndsWith($file, "xml"))
                    {
                        $xml = simplexml_load_file("../data/xml/$file");
                        try
                        {
                            $rootName = $xml->getName();
                            if ( $rootName == "w2iv" && $xml["lang"] == $this->language)
                            {
                                header("content-type: text/xml", TRUE);
                                echo file_get_contents("../data/xml/$file");
                            }

                            else
                            {
                                continue;
                            }
                        }

                        catch (Exception $e)
                        {
                            continue;
                        }
                    }

                    else
                    {
                        continue;
                    }
                }
            }

            else
            {
                echo "ERROR\n: Could not open directory";
            }
        }

        public function sendLineXml()
        {
            header("content-type: text/xml", TRUE);
            echo file_get_contents("../data/xml/line.xml");
        }

        public function sendPatXML()
        {
            header("content-type: text/xml", TRUE);
            echo file_get_contents("../data/xml/past_and_today.xml");
        }

        public function getAvailableLanguages()
        {
            $echoText = $this->available_languages[0];
            for ($i = 1; i < count($this->available_languages); $i++)
            {
                $echoText .= "+" . $this->available_languages[$i];
            }

            echo $echoText;
        }

        public function sendAvailableLanguages()
        {
            $echoArray = array();
            for ($i = 0; $i < count($this->available_languages); $i++)
            {
                $echoText = "<option value=\"{$this->available_languages[$i]}\"><img src=\"/images/flag_{$this->available_languages[$i]}.svg\" />" . "<span>" . $this->available_languages[$i] . "</span></option>";
                array_push($echoArray, $echoText);
            }

            $response = $echoArray[0];
            for ($i = 1; $i < count($echoArray); $i++)
            {
                $response .= "+" . $echoArray[$i];
            }

            echo $response;
        }

        public function sendAvailableLanguagesKey()
        {
            $echoText = $this->available_languages[0];
            for ($i = 1; $i < count($this->available_languages); $i++)
            {
                $echoText .= "+" . $this->available_languages[$i];
            }

            echo $echoText;
        }

        public function changeLanguage($l)
        {
            $this->language = (checkLang($l)) ? $l : $this->language;
        }

        public function search($keywords)
        {
            return;
        }
    }

    function fileEndsWith($filename, $ending)
    {
        $tmp = explode(".", $filename);
        $extinction = $tmp[count($tmp) - 1];

        if ($extinction == $ending)
        {
            return TRUE;
        }

        return FALSE;
    }
?>